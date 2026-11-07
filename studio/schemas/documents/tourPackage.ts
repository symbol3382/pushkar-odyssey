import { defineField, defineType } from "sanity";
import {
  choiceField,
  offeringFields,
  publishingNote,
  stringList,
} from "../fields";

export const tourPackage = defineType({
  name: "tourPackage",
  title: "Tour package",
  type: "document",
  description: `${publishingNote} Multi-day Pushkar itineraries and stays offered with tours.`,
  fields: [
    ...offeringFields(),
    choiceField(
      "kind",
      "Type",
      [
        { title: "Tour itinerary", value: "itinerary" },
        { title: "Stay", value: "stay" },
      ],
      { layout: "dropdown" },
    ),
    defineField({
      name: "days",
      title: "Days",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "nights",
      title: "Nights",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "durationLabel",
      title: "Duration label",
      type: "localeString",
      description:
        'Optional override, such as "2 days / 1 night". Otherwise the website uses the day and night numbers.',
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
    }),
    stringList("included", "Included", "One entry per item."),
    stringList("excluded", "Not included", "Optional."),
    choiceField(
      "stayStyle",
      "Stay style",
      [
        { title: "Private pool", value: "private-pool" },
        { title: "Near lake", value: "near-lake" },
        { title: "Luxury / boutique / desert", value: "luxury-boutique-desert" },
        { title: "Luxury hotel / resort", value: "luxury-hotel" },
        { title: "Family & couple", value: "family-couple" },
        { title: "Budget hotel", value: "budget" },
        { title: "Not a stay", value: "none" },
      ],
      { required: false, layout: "dropdown" },
    ),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled tour",
        media,
        subtitle: kind || "Tour package",
      };
    },
  },
});
