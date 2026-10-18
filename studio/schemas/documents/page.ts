import { defineType } from "sanity";
import {
  imageField,
  publishingNote,
  requiredLocale,
  seoField,
  slugField,
} from "../fields";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  description: `${publishingNote} Use a page for ordinary text that does not fit poojas, tours, stays, or destinations. The address will be /pages/your-slug.`,
  fields: [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    requiredLocale("summary", "Summary", "localeText"),
    requiredLocale("body", "Body", "localeBlockContent"),
    imageField("image", "Image", false, "Optional hero image."),
    seoField,
  ],
  preview: {
    select: { title: "title.en", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Untitled page", media };
    },
  },
});
