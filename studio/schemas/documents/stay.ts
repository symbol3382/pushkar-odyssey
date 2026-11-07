import { defineField, defineType } from "sanity";
import {
  catalogFields,
  choiceField,
  publishingNote,
  stringList,
} from "../fields";

export const stay = defineType({
  name: "stay",
  title: "Stay",
  type: "document",
  description: `${publishingNote} This is a listing, not live room availability. Leave the price empty if it is not confirmed.`,
  fields: [
    ...catalogFields(),
    choiceField("stayCategory", "Stay category", [
      { title: "Room with a private pool", value: "private-pool" },
      { title: "Stay near the lake", value: "near-lake" },
      { title: "Luxury, boutique, or desert stay", value: "luxury-boutique-desert" },
      { title: "Luxury hotel or resort", value: "luxury-hotel" },
      { title: "Family and couple stay", value: "family-couple" },
      { title: "Budget hotel", value: "budget" },
      { title: "Other", value: "other" },
    ]),
    defineField({ name: "address", title: "Address", type: "localeText" }),
    defineField({
      name: "coordinates",
      title: "Map coordinates",
      type: "coordinates",
    }),
    stringList("amenities", "Amenities", "One entry per amenity."),
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "localeText",
      description:
        "Describe room types. Do not mark rooms as available.",
    }),
    stringList("included", "What's included", "Optional."),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "featuredImage",
      stayCategory: "stayCategory",
    },
    prepare({ title, media, stayCategory }) {
      return {
        title: title || "Untitled stay",
        media,
        subtitle: stayCategory || "Stay",
      };
    },
  },
});
