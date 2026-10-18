import { defineField, defineType } from "sanity";
import {
  imageField,
  publishingNote,
  requiredLocale,
  sortOrderField,
} from "../fields";

export const workItem = defineType({
  name: "workItem",
  title: "Work",
  type: "document",
  description: `${publishingNote} These appear in the works gallery. Do not add a guest story you cannot stand behind.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    requiredLocale(
      "category",
      "Category",
      "localeString",
      "For example Pooja, Tour, Stay, or Service.",
    ),
    requiredLocale("summary", "Description", "localeText"),
    imageField("image", "Image", true),
    defineField({
      name: "dateLabel",
      title: "Date label",
      type: "string",
      description:
        "Optional display date, such as 2025-11. Leave empty if you do not want a date.",
    }),
    sortOrderField,
  ],
  preview: {
    select: { title: "title.en", media: "image", subtitle: "category.en" },
  },
});
