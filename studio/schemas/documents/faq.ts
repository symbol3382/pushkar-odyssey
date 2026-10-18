import { defineType } from "sanity";
import { publishingNote, requiredLocale, sortOrderField } from "../fields";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  description: publishingNote,
  fields: [
    requiredLocale("question", "Question", "localeString"),
    requiredLocale("answer", "Answer", "localeText"),
    sortOrderField,
  ],
  preview: {
    select: { title: "question.en" },
    prepare({ title }) {
      return { title: title || "Untitled question" };
    },
  },
});
