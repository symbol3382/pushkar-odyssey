import { defineField, defineType } from "sanity";
import {
  choiceField,
  offeringFields,
  publishingNote,
  stringList,
} from "../fields";

export const bestSeller = defineType({
  name: "bestSeller",
  title: "Best seller",
  type: "document",
  description: `${publishingNote} Pushkar products, boho garments, and property services.`,
  fields: [
    ...offeringFields(),
    choiceField(
      "kind",
      "Type",
      [
        { title: "Local product", value: "product" },
        { title: "Boho / garment", value: "garment" },
        { title: "Property", value: "property" },
      ],
      { layout: "dropdown" },
    ),
    defineField({
      name: "seasonal",
      title: "Seasonal",
      type: "boolean",
      description: "Mark seasonal items such as jamun products.",
      initialValue: false,
    }),
    stringList("highlights", "Highlights", "Optional."),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled best seller",
        media,
        subtitle: kind || "Best seller",
      };
    },
  },
});
