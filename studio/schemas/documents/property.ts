import { defineArrayMember, defineField, defineType } from "sanity";
import { catalogFields, choiceField, publishingNote } from "../fields";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  description: `${publishingNote} A property someone can buy, sell, or ask about as an investment. A price is not a confirmed offer.`,
  fields: [
    ...catalogFields(),
    choiceField("propertyType", "Property type", [
      { title: "Residential plot", value: "residential-plot" },
      { title: "Farmhouse or agricultural land", value: "farmhouse" },
      { title: "Villa or luxury home", value: "villa" },
      { title: "Hotel, resort, or guest house", value: "hotel" },
      { title: "Commercial shop or land", value: "commercial" },
      { title: "Investment consultation", value: "consultation" },
      { title: "Other", value: "other" },
    ]),
    defineField({
      name: "purpose",
      title: "Purpose",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Buy", value: "buy" },
          { title: "Sell", value: "sell" },
          { title: "Invest", value: "invest" },
        ],
      },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "coordinates",
      title: "Map coordinates",
      type: "coordinates",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "featuredImage",
      propertyType: "propertyType",
    },
    prepare({ title, media, propertyType }) {
      return {
        title: title || "Untitled property",
        media,
        subtitle: propertyType || "Property",
      };
    },
  },
});