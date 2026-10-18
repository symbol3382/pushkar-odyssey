import { defineField, defineType } from "sanity";
import {
  featuredField,
  imageField,
  publishingNote,
  requiredLocale,
  seoField,
  slugField,
  sortOrderField,
  stringList,
} from "../fields";

export const travelPackage = defineType({
  name: "travelPackage",
  title: "Travel package",
  type: "document",
  description: `${publishingNote} Leave the price empty for enquiry-only journeys.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    requiredLocale("summary", "Summary", "localeText"),
    requiredLocale("description", "Detailed description", "localeBlockContent"),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    defineField({
      name: "startingLocation",
      title: "Starting location",
      type: "localeString",
    }),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "destination" }] }],
    }),
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
    stringList("included", "Included services", "One entry per item."),
    stringList("excluded", "Excluded services", "Optional."),
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
    defineField({ name: "price", title: "Starting price", type: "price" }),
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
      description:
        "Optional. Leave empty if you do not want to recommend a season.",
    }),
    featuredField,
    sortOrderField,
    seoField,
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
        title: title || "Untitled package",
        media,
        subtitle: featured ? "Featured" : "Travel package",
      };
    },
  },
});
