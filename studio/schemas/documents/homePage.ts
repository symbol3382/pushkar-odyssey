import { defineArrayMember, defineField, defineType } from "sanity";
import { publishingNote } from "../fields";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  description: `${publishingNote} Hero titles and button labels live in the website. Use this document for hero banner images only. Mark catalog items as Featured to show them on the home page rails.`,
  fields: [
    defineField({
      name: "heroImages",
      title: "Hero images",
      type: "array",
      description:
        "One or more banner images. The website rotates through them automatically.",
      of: [defineArrayMember({ type: "galleryImage" })],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1).error("Add at least one hero image"),
    }),
  ],
  preview: {
    select: { media: "heroImages.0" },
    prepare({ media }) {
      return { title: "Home page", media };
    },
  },
});
