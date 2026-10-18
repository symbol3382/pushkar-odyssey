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

export const pooja = defineType({
  name: "pooja",
  title: "Pooja",
  type: "document",
  description: `${publishingNote} Leave the price empty for enquiry-only rituals.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    requiredLocale(
      "summary",
      "Short description",
      "localeText",
      "Shown on cards.",
    ),
    requiredLocale("description", "Full description", "localeBlockContent"),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "localeString",
      description: "Optional, for example aarti or abhishek.",
    }),
    defineField({
      name: "destination",
      title: "Destination or temple",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localeString",
      description: 'Optional, for example "45 minutes".',
    }),
    defineField({ name: "price", title: "Starting price", type: "price" }),
    stringList(
      "included",
      "What's included",
      "One entry per item. English is required on each entry you add.",
    ),
    stringList("excluded", "What's excluded", "Optional. One entry per item."),
    defineField({
      name: "preparation",
      title: "Preparation",
      type: "localeText",
      description: "Optional instructions for the guest.",
    }),
    defineField({
      name: "languages",
      title: "Available languages",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Languages a priest or host can use. This is not the website language list.",
      options: { layout: "tags" },
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
    {
      title: "Title",
      name: "title",
      by: [{ field: "title.en", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", featured: "featured" },
    prepare({ title, media, featured }) {
      return {
        title: title || "Untitled pooja",
        media,
        subtitle: featured ? "Featured" : "Pooja",
      };
    },
  },
});
