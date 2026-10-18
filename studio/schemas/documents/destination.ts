import { defineField, defineType } from "sanity";
import {
  featuredField,
  imageField,
  publishingNote,
  requiredLocale,
  seoField,
  slugField,
  sortOrderField,
} from "../fields";

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  description: `${publishingNote} Related poojas, packages, and experiences appear here automatically when they link to this place.`,
  fields: [
    requiredLocale("title", "Name", "localeString"),
    slugField,
    requiredLocale("summary", "Summary", "localeText"),
    requiredLocale("description", "Detailed description", "localeBlockContent"),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Images",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    defineField({
      name: "region",
      title: "Address or region",
      type: "localeString",
    }),
    defineField({
      name: "coordinates",
      title: "Map coordinates",
      type: "coordinates",
    }),
    defineField({
      name: "visiting",
      title: "Visiting information",
      type: "localeText",
    }),
    featuredField,
    sortOrderField,
    seoField,
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", featured: "featured" },
    prepare({ title, media, featured }) {
      return {
        title: title || "Untitled destination",
        media,
        subtitle: featured ? "Featured" : "Destination",
      };
    },
  },
});
