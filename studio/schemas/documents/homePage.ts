import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, publishingNote, requiredLocale } from "../fields";

function cta(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      requiredLocale("label", "Label", "localeString"),
      defineField({
        name: "path",
        title: "Path",
        type: "string",
        description: "An internal path such as /tours or /poojas.",
        validation: (rule) =>
          rule.required().custom((value: string | undefined) => {
            if (!value?.startsWith("/")) return "Start the path with /";
            return true;
          }),
      }),
    ],
  });
}

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
  description: publishingNote,
  fields: [
    requiredLocale("heroTitle", "Hero title", "localeString"),
    requiredLocale("heroSubtitle", "Hero subtitle", "localeText"),
    imageField("heroImage", "Hero image", true),
    cta("primaryCta", "Primary button"),
    cta("secondaryCta", "Secondary button"),
    references("featuredTours", "Featured tours", "travelPackage"),
    references("featuredPoojas", "Featured poojas", "pooja"),
    references("featuredStays", "Featured stays", "stay"),
  ],
  preview: {
    select: { title: "heroTitle.en", media: "heroImage" },
    prepare({ title, media }) {
      return { title: title || "Home page", media };
    },
  },
});
