import { defineField, defineType } from "sanity";

export const coordinates = defineType({
  name: "coordinates",
  title: "Map coordinates",
  type: "object",
  description:
    "Optional. Enter both latitude and longitude, or leave both empty.",
  fields: [
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
      validation: (rule) => rule.min(-90).max(90),
    }),
    defineField({
      name: "lng",
      title: "Longitude",
      type: "number",
      validation: (rule) => rule.min(-180).max(180),
    }),
  ],
  validation: (rule) =>
    rule.custom((value: { lat?: number; lng?: number } | undefined) => {
      if (!value) return true;
      const hasLat = typeof value.lat === "number";
      const hasLng = typeof value.lng === "number";
      if (hasLat !== hasLng)
        return "Enter both latitude and longitude, or leave both empty";
      return true;
    }),
});
