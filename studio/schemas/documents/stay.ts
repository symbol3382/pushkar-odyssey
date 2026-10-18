import { defineField, defineType } from "sanity";
import {
  featuredField,
  imageField,
  publishingNote,
  requiredLocale,
  seoField,
  slugField,
  sortOrderField,
  stringList,
} from "../fields";

export const stay = defineType({
  name: "stay",
  title: "Stay",
  type: "document",
  description: `${publishingNote} This is a listing, not live room availability. Leave the price empty if it is not confirmed.`,
  fields: [
    requiredLocale("title", "Hotel name", "localeString"),
    slugField,
    requiredLocale("summary", "Short description", "localeText"),
    requiredLocale("description", "Full description", "localeBlockContent"),
    defineField({ name: "address", title: "Address", type: "localeText" }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    defineField({
      name: "coordinates",
      title: "Map coordinates",
      type: "coordinates",
    }),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    stringList("amenities", "Amenities", "One entry per amenity."),
    defineField({
      name: "accommodationType",
      title: "Accommodation type",
      type: "string",
      options: {
        list: [
          { title: "Haveli", value: "haveli" },
          { title: "Hotel", value: "hotel" },
          { title: "Camp", value: "camp" },
          { title: "Guesthouse", value: "guesthouse" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "rooms",
      title: "Rooms or packages",
      type: "localeText",
      description:
        "Describe room types or stay packages. Do not mark rooms as available.",
    }),
    defineField({ name: "price", title: "Starting price", type: "price" }),
    stringList("included", "What's included", "Optional."),
    defineField({
      name: "enquiryNote",
      title: "Enquiry instructions",
      type: "localeText",
      description:
        "Optional. Do not imply that a room is held or a booking is confirmed.",
    }),
    featuredField,
    sortOrderField,
    seoField,
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", featured: "featured" },
    prepare({ title, media, featured }) {
      return {
        title: title || "Untitled stay",
        media,
        subtitle: featured ? "Featured" : "Stay",
      };
    },
  },
});
