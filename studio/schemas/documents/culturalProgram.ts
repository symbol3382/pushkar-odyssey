import { defineField, defineType } from "sanity";
import {
  choiceField,
  offeringFields,
  publishingNote,
  stringList,
} from "../fields";

export const culturalProgram = defineType({
  name: "culturalProgram",
  title: "Cultural program",
  type: "document",
  description: `${publishingNote} Desert night camping, cultural evenings, and dune ride experiences.`,
  fields: [
    ...offeringFields(),
    choiceField(
      "kind",
      "Type",
      [
        { title: "Night camping package", value: "camping" },
        { title: "Desert ride", value: "ride" },
        { title: "Adventure activity", value: "adventure" },
      ],
      { layout: "dropdown" },
    ),
    defineField({
      name: "startTime",
      title: "Typical start time",
      type: "string",
      description: 'Optional, for example "5:00 PM".',
    }),
    stringList(
      "programFlow",
      "Program flow",
      "Ordered steps for the evening or ride.",
    ),
    stringList("included", "Included", "Optional."),
    stringList("excluded", "Not included", "Optional."),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
      description: "Optional multi-stop breakdown.",
    }),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled cultural program",
        media,
        subtitle: kind || "Cultural program",
      };
    },
  },
});
