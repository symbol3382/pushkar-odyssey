import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, publishingNote } from "../fields";

function references(name: string, title: string, to: string) {
  return defineField({
    name,
    title,
    type: "array",
    description:
      "Optional. If you leave this empty, the home page uses items marked as featured.",
    of: [defineArrayMember({ type: "reference", to: [{ type: to }] })],
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  description: `${publishingNote} Hero titles and button labels live in the website. Use this document for the banner image and featured listings only.`,
  fields: [
    imageField("heroImage", "Hero image", true),
    references("featuredDarshan", "Featured darshan", "darshan"),
    references("featuredDesert", "Featured desert experiences", "desertExperience"),
    references("featuredTours", "Featured tours", "tourPackage"),
    references("featuredStays", "Featured stays", "stay"),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare({ media }) {
      return { title: "Home page", media };
    },
  },
});
