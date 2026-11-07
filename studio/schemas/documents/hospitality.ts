import { defineType } from "sanity";
import { catalogFields, choiceField, publishingNote } from "../fields";

export const hospitality = defineType({
  name: "hospitality",
  title: "Event or hospitality",
  type: "document",
  description: `${publishingNote} Weddings, parties, outings, taxis, and money exchange. Sending an enquiry does not confirm the event.`,
  fields: [
    ...catalogFields(),
    choiceField("kind", "Service", [
      { title: "Destination wedding", value: "wedding" },
      { title: "Anniversary", value: "anniversary" },
      { title: "Birthday", value: "birthday" },
      { title: "Corporate event or team outing", value: "corporate" },
      { title: "Taxi and cab", value: "taxi" },
      { title: "Money exchange", value: "money-exchange" },
      { title: "Other", value: "other" },
    ]),
  ],
  preview: {
    select: { title: "title.en", media: "featuredImage", kind: "kind" },
    prepare({ title, media, kind }) {
      return {
        title: title || "Untitled service",
        media,
        subtitle: kind || "Hospitality",
      };
    },
  },
});
