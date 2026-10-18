import { defineField, defineType } from "sanity";
import { publishingNote, requiredLocale, sortOrderField } from "../fields";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description: `${publishingNote} Publish only a real guest comment you have permission to show. Do not invent names, quotes, or ratings.`,
  fields: [
    requiredLocale("quote", "Quote", "localeText"),
    defineField({
      name: "name",
      title: "Guest name",
      type: "string",
      description:
        "The name the guest agreed to show. Leave empty to publish the quote without a name.",
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "localeString",
      description:
        "Optional context, such as a city or the trip they took. Do not add a star rating.",
    }),
    sortOrderField,
  ],
  preview: {
    select: { title: "name", subtitle: "quote.en" },
    prepare({ title, subtitle }) {
      return { title: title || "Unnamed guest", subtitle };
    },
  },
});
