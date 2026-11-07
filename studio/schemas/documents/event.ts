import { defineField, defineType } from "sanity";
import {
  choiceField,
  offeringFields,
  publishingNote,
  stringList,
} from "../fields";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  description: `${publishingNote} Festivals, celebrations, and hospitality services in Pushkar.`,
  fields: [
    ...offeringFields(),
    choiceField(
      "kind",
      "Type",
      [
        { title: "Festival / celebration", value: "festival" },
        { title: "Hospitality / event service", value: "hospitality" },
        { title: "Transfer / practical help", value: "practical" },
      ],
      { layout: "dropdown" },
    ),
    defineField({
      name: "when",
      title: "When",
      type: "localeString",
      description: "Optional season or timing note.",
    }),
    stringList("highlights", "Highlights", "Optional."),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled event",
        media,
        subtitle: kind || "Event",
      };
    },
  },
});
