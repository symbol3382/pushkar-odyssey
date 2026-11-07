import { defineField, defineType } from "sanity";
import {
  catalogFields,
  publishingNote,
  stringList,
} from "../fields";

export const tourPackage = defineType({
  name: "tourPackage",
  title: "Tour package",
  type: "document",
  description: `${publishingNote} A multi-day Pushkar itinerary. Leave the price empty when the journey is enquiry-only.`,
  fields: [
    ...catalogFields(),
    defineField({
      name: "days",
      title: "Days",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "nights",
      title: "Nights",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "durationLabel",
      title: "Duration label",
      type: "localeString",
      description:
        'Optional override, such as "2 days / 1 night". Otherwise the website uses the day and night numbers.',
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
    }),
    stringList("included", "Included", "One entry per item."),
    stringList("excluded", "Not included", "Optional."),
    defineField({ name: "transport", title: "Transport", type: "localeText" }),
    defineField({
      name: "accommodation",
      title: "Accommodation",
      type: "localeText",
    }),
    defineField({
      name: "languages",
      title: "Available languages",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "minGroup",
      title: "Minimum group size",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "maxGroup",
      title: "Maximum group size",
      type: "number",
      validation: (rule) =>
        rule
          .integer()
          .min(1)
          .custom((value, context) => {
            const parent = context.parent as { minGroup?: number } | undefined;
            if (
              typeof value === "number" &&
              typeof parent?.minGroup === "number" &&
              value < parent.minGroup
            ) {
              return "Maximum group size cannot be smaller than the minimum";
            }
            return true;
          }),
    }),
    defineField({
      name: "season",
      title: "Best travel season",
      type: "localeString",
      description: "Optional. Leave empty if you do not want to recommend a season.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", featured: "featured" },
    prepare({ title, media, featured }) {
      return {
        title: title || "Untitled tour",
        media,
        subtitle: featured ? "Featured" : "Tour package",
      };
    },
  },
});
