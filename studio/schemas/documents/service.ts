import { defineArrayMember, defineField, defineType } from "sanity";
import {
  featuredField,
  imageField,
  publishingNote,
  questionNotes,
  requiredLocale,
  seoField,
  slugField,
  sortOrderField,
  stringList,
} from "../fields";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  description: `${publishingNote} One bookable or enquire-only offering under a service category.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),
    requiredLocale(
      "summary",
      "Short description",
      "localeText",
      "Shown on cards.",
    ),
    requiredLocale(
      "description",
      "Full description",
      "localeText",
      "Markdown supported. Use headings, lists, and emphasis.",
    ),
    imageField("featuredImage", "Featured image", false),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
    }),
    defineField({ name: "price", title: "Starting price", type: "price" }),
    stringList(
      "highlights",
      "Highlights",
      "Optional. Key points shown on the detail page.",
    ),
    stringList("included", "Included", "Optional. One entry per item."),
    stringList("excluded", "Not included", "Optional."),
    questionNotes("Optional questions and answers for this service."),
    defineField({
      name: "days",
      title: "Days",
      type: "number",
      description: "Optional. Used for multi-day packages.",
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
    defineField({
      name: "enquiryNote",
      title: "Enquiry instructions",
      type: "localeText",
      description:
        "Optional. Explain how to enquire. Do not say a booking is confirmed.",
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
    select: {
      title: "title.en",
      media: "featuredImage",
      category: "category.title.en",
      featured: "featured",
    },
    prepare({ title, media, category, featured }) {
      return {
        title: title || "Untitled service",
        media,
        subtitle: [featured ? "Featured" : null, category]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
