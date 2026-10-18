import { defineField, defineType } from "sanity";

export const itineraryDay = defineType({
  name: "itineraryDay",
  title: "Itinerary day",
  type: "object",
  fields: [
    defineField({
      name: "dayNumber",
      title: "Day number",
      type: "number",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
      description: "Optional place name for this day.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "galleryImage",
      description: "Optional.",
    }),
  ],
  preview: {
    select: { dayNumber: "dayNumber", heading: "heading.en", media: "image" },
    prepare({ dayNumber, heading, media }) {
      const day =
        typeof dayNumber === "number" ? `Day ${String(dayNumber)}` : "Day";
      return { title: heading ? `${day}: ${heading}` : day, media };
    },
  },
});
