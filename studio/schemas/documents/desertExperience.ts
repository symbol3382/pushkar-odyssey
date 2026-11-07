import { defineField, defineType } from "sanity";
import { catalogFields, choiceField, publishingNote, stringList } from "../fields";

const adventureActivities = [
  { title: "Zipline", value: "zipline" },
  { title: "Paintball", value: "paintball" },
  { title: "Zorbing", value: "zorbing" },
  { title: "Rock climbing", value: "rock-climbing" },
  { title: "Rappelling", value: "rappelling" },
  { title: "Archery", value: "archery" },
  { title: "Dune bashing", value: "dune-bashing" },
  { title: "Other", value: "other" },
];

export const desertExperience = defineType({
  name: "desertExperience",
  title: "Desert experience",
  type: "document",
  description: `${publishingNote} Night camping, a desert ride, or one adventure activity. For the night camp, list the evening sequence under inclusions.`,
  fields: [
    ...catalogFields(),
    choiceField("kind", "Experience", [
      { title: "Desert night camp", value: "night-camp" },
      { title: "Single camel", value: "camel" },
      { title: "Camel cart", value: "camel-cart" },
      { title: "Jeep safari", value: "jeep" },
      { title: "ATV bike", value: "atv" },
      { title: "Horse riding", value: "horse" },
      { title: "Adventure activity", value: "adventure" },
    ]),
    defineField({
      name: "adventureActivity",
      title: "Adventure activity",
      type: "string",
      options: { list: adventureActivities, layout: "dropdown" },
      hidden: ({ parent }) =>
        (parent as { kind?: string } | undefined)?.kind !== "adventure",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined;
          if (parent?.kind === "adventure" && !value) {
            return "Choose an adventure activity";
          }
          return true;
        }),
    }),
    stringList(
      "included",
      "Included steps",
      "For a night camp, list the evening in order: camel safari, sunset, dinner, tent stay, breakfast, and the return.",
    ),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled desert experience",
        media,
        subtitle: kind || "Desert",
      };
    },
  },
});
