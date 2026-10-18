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

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  description: `${publishingNote} Use this for guides, riding, transfers, photography, and similar local services.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    defineField({
      name: "experienceType",
      title: "Experience type",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Guide", value: "guide" },
          { title: "Riding", value: "riding" },
          { title: "Transfer", value: "transfer" },
          { title: "Photography", value: "photography" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
    }),
    requiredLocale("summary", "Short description", "localeText"),
    requiredLocale("description", "Detailed description", "localeBlockContent"),
    defineField({ name: "location", title: "Location", type: "localeString" }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    defineField({ name: "duration", title: "Duration", type: "localeString" }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    stringList("included", "What's included", "Optional."),
    stringList("excluded", "What's excluded", "Optional."),
    defineField({ name: "price", title: "Starting price", type: "price" }),
    defineField({
      name: "requirements",
      title: "Requirements or restrictions",
      type: "localeText",
      description: "Optional. Age, fitness, dress, or timing limits.",
    }),
    defineField({
      name: "enquiryNote",
      title: "Booking instructions",
      type: "localeText",
      description: "Optional. An enquiry is not a confirmed booking.",
    }),
    featuredField,
    sortOrderField,
    seoField,
  ],
  preview: {
    select: {
      title: "title.en",
      media: "featuredImage",
      experienceType: "experienceType",
    },
    prepare({ title, media, experienceType }) {
      return {
        title: title || "Untitled experience",
        media,
        subtitle: experienceType || "Experience",
      };
    },
  },
});
