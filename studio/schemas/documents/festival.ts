import { defineField, defineType } from "sanity";
import { catalogFields, choiceField, publishingNote, stringList } from "../fields";

export const festival = defineType({
  name: "festival",
  title: "Festival",
  type: "document",
  description: `${publishingNote} Holi, the Pushkar Camel Fair, New Year, or another celebration hosted in Pushkar.`,
  fields: [
    ...catalogFields(),
    choiceField("festival", "Celebration", [
      { title: "Holi", value: "holi" },
      { title: "Pushkar Camel Fair", value: "camel-fair" },
      { title: "New Year", value: "new-year" },
      { title: "Other", value: "other" },
    ]),
    defineField({
      name: "when",
      title: "When",
      type: "localeString",
      description: "Season or dates, such as November or 31 December.",
    }),
    stringList("highlights", "Highlights", "Optional. One entry per highlight."),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", festival: "festival" },
    prepare({ title, media, festival }) {
      return {
        title: title || "Untitled festival",
        media,
        subtitle: festival || "Festival",
      };
    },
  },
});
