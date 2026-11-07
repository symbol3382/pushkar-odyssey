import { defineType } from "sanity";
import {
  choiceField,
  offeringFields,
  publishingNote,
  questionNotes,
  stringList,
} from "../fields";

export const darshan = defineType({
  name: "darshan",
  title: "Darshan",
  type: "document",
  description: `${publishingNote} Sacred visits, lake and temple darshan, aarti, storytelling, and vedic poojas.`,
  fields: [
    ...offeringFields(),
    choiceField(
      "kind",
      "Type",
      [
        { title: "Sacred visit", value: "visit" },
        { title: "Vedic pooja", value: "vedic" },
        { title: "Full darshan package", value: "package" },
      ],
      { layout: "dropdown" },
    ),
    choiceField(
      "visitFocus",
      "Visit focus",
      [
        { title: "Pushkar Lake (VIP)", value: "lake-vip" },
        { title: "Brahma Temple (VIP)", value: "brahma-temple-vip" },
        { title: "Evening Pushkar Lake aarti", value: "evening-aarti" },
        { title: "Local storyteller", value: "storyteller" },
        { title: "Mixed / full visit", value: "mixed" },
        { title: "Online / live video", value: "live-video" },
        { title: "Other", value: "other" },
      ],
      { required: false, layout: "dropdown" },
    ),
    stringList(
      "included",
      "Included",
      "Optional. Stops, rituals, or people included.",
    ),
    choiceField(
      "format",
      "How it is offered",
      [
        { title: "In person", value: "in-person" },
        { title: "Online", value: "online" },
        { title: "In person or online", value: "both" },
      ],
      { required: false, layout: "dropdown" },
    ),
    questionNotes(
      "Optional mythology notes visitors often ask — for example why the Brahma temple is in Pushkar.",
    ),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled darshan",
        media,
        subtitle: kind || "Darshan",
      };
    },
  },
});
