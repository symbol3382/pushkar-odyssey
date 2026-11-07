import { defineField, defineType } from "sanity";
import { catalogFields, choiceField, publishingNote } from "../fields";

const localCategories = new Set([
  "ittar",
  "jamun",
  "jewellery",
  "rose",
  "rudraksha",
  "hemp",
  "leather",
  "other",
]);

const bohoCategories = new Set([
  "boho-clothing",
  "kaftan",
  "maxi-dress",
  "kimono",
  "top",
  "skirt",
  "tunic",
  "printed",
  "scarf",
  "jumpsuit",
  "other",
]);

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  description: `${publishingNote} A Pushkar product or a boho garment. A price is optional and is not a confirmed order.`,
  fields: [
    ...catalogFields(),
    choiceField("catalog", "Catalog", [
      { title: "Pushkar products", value: "local" },
      { title: "Boho clothing", value: "boho" },
    ]),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Ittar and agarbatti", value: "ittar" },
          { title: "Jamun products", value: "jamun" },
          { title: "German silver and fashion jewellery", value: "jewellery" },
          { title: "Rose water and gulkand", value: "rose" },
          { title: "Rudraksha and spiritual items", value: "rudraksha" },
          { title: "Hemp goods", value: "hemp" },
          { title: "Leather goods", value: "leather" },
          { title: "Boho clothing", value: "boho-clothing" },
          { title: "Kaftan", value: "kaftan" },
          { title: "Maxi dress", value: "maxi-dress" },
          { title: "Kimono", value: "kimono" },
          { title: "Top", value: "top" },
          { title: "Skirt", value: "skirt" },
          { title: "Tunic", value: "tunic" },
          { title: "Printed garment", value: "printed" },
          { title: "Scarf or stole", value: "scarf" },
          { title: "Jumpsuit", value: "jumpsuit" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const catalog = (context.parent as { catalog?: string } | undefined)
            ?.catalog;
          if (!value || !catalog) return true;
          const allowed = catalog === "boho" ? bohoCategories : localCategories;
          if (!allowed.has(value)) {
            return "Choose a category that belongs to this catalog";
          }
          return true;
        }),
    }),
    defineField({
      name: "seasonal",
      title: "Seasonal",
      type: "boolean",
      description: "Turn on for goods that are only available in season, such as jamun.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "featuredImage",
      catalog: "catalog",
    },
    prepare({ title, media, catalog }) {
      return {
        title: title || "Untitled product",
        media,
        subtitle: catalog || "Product",
      };
    },
  },
});
