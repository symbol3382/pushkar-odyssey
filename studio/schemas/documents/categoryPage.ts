import { defineType } from "sanity";
import { choiceField, imageField, publishingNote } from "../fields";

const CATEGORY_OPTIONS = [
  { title: "Darshan", value: "darshan" },
  { title: "Cultural program", value: "cultural" },
  { title: "Tour packages", value: "tour" },
  { title: "Events", value: "events" },
  { title: "Best sellers", value: "bestsellers" },
];

export const categoryPage = defineType({
  name: "categoryPage",
  title: "Category page",
  type: "document",
  description: `${publishingNote} One entry per website category. The image is shown on that category’s listing page hero.`,
  fields: [
    choiceField("category", "Category", CATEGORY_OPTIONS, {
      description: "Must match a website category. Create only one document per category.",
      layout: "dropdown",
    }),
    imageField(
      "image",
      "Category image",
      true,
      "Shown as the hero image on the category listing page.",
    ),
  ],
  preview: {
    select: { category: "category", media: "image" },
    prepare({ category, media }) {
      const label =
        CATEGORY_OPTIONS.find((option) => option.value === category)?.title ||
        category ||
        "Category page";
      return { title: label, media, subtitle: "Category hero image" };
    },
  },
});
