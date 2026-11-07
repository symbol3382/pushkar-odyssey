import { defineType } from "sanity";
import {
  featuredField,
  imageField,
  publishingNote,
  requiredLocale,
  seoField,
  slugField,
  sortOrderField,
} from "../fields";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service category",
  type: "document",
  description: `${publishingNote} Groups services on the website (darshan, tours, stays, and so on).`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    requiredLocale(
      "summary",
      "Short description",
      "localeText",
      "Shown on category listing cards and page intros.",
    ),
    requiredLocale(
      "description",
      "Full description",
      "localeText",
      "Markdown supported. Shown on the category page when needed.",
    ),
    imageField("featuredImage", "Featured image", false),
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
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title: title || "Untitled category",
        media,
        subtitle: featured ? "Featured on home" : "Service category",
      };
    },
  },
});
