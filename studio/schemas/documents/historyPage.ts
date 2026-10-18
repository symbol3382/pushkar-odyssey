import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, publishingNote, requiredLocale } from "../fields";

export const historyPage = defineType({
  name: "historyPage",
  title: "History page",
  type: "document",
  description: publishingNote,
  fields: [
    requiredLocale("introTitle", "Title", "localeString"),
    requiredLocale("introSubtitle", "Subtitle", "localeText"),
    imageField(
      "heroImage",
      "Hero image",
      false,
      "Optional. The built-in history image is used when this is empty.",
    ),
    defineField({
      name: "blocks",
      title: "Timeline",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredLocale("year", "Year or era", "localeString"),
            requiredLocale("title", "Title", "localeString"),
            requiredLocale("body", "Body", "localeText"),
          ],
          preview: {
            select: { title: "title.en", subtitle: "year.en" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "introTitle.en" },
    prepare({ title }) {
      return { title: title || "History" };
    },
  },
});
