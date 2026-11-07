import { defineField, defineType } from "sanity";
import { catalogFields, choiceField, publishingNote, stringList } from "../fields";

export const vedicPooja = defineType({
  name: "vedicPooja",
  title: "Vedic pooja",
  type: "document",
  description: `${publishingNote} Rituals that can be arranged in Pushkar or followed online. Leave the price empty when it is enquiry-only.`,
  fields: [
    ...catalogFields(),
    choiceField("ritual", "Ritual", [
      { title: "Pitra Dosh Nivaran", value: "pitra-dosh" },
      { title: "Shrad paksh pooja", value: "shrad-paksh" },
      { title: "Pind Daan", value: "pind-daan" },
      { title: "Tarpan", value: "tarpan" },
      { title: "Narayan Bali", value: "narayan-bali" },
      { title: "Sukh shanti", value: "sukh-shanti" },
      { title: "Live video call pooja", value: "live-video" },
      { title: "Other", value: "other" },
    ]),
    choiceField(
      "format",
      "How it is offered",
      [
        { title: "In person", value: "in-person" },
        { title: "Online", value: "online" },
        { title: "In person or online", value: "both" },
      ],
      { description: "Online rituals can be followed from outside Pushkar." },
    ),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localeString",
      description: 'Optional, for example "45 minutes".',
    }),
    defineField({
      name: "preparation",
      title: "Preparation",
      type: "localeText",
      description: "Optional instructions for the guest.",
    }),
    stringList(
      "included",
      "What's included",
      "One entry per item. English is required on each entry you add.",
    ),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", ritual: "ritual" },
    prepare({ title, media, ritual }) {
      return {
        title: title || "Untitled ritual",
        media,
        subtitle: ritual || "Vedic pooja",
      };
    },
  },
});
