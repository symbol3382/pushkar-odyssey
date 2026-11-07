import { defineType } from "sanity";
import {
  catalogFields,
  choiceField,
  publishingNote,
  questionNotes,
  stringList,
} from "../fields";

export const darshan = defineType({
  name: "darshan",
  title: "Darshan",
  type: "document",
  description: `${publishingNote} Use this for Pushkar Lake, Brahma Temple, evening aarti, a storyteller, or a full darshan visit.`,
  fields: [
    ...catalogFields(),
    choiceField("category", "Visit", [
      { title: "Pushkar Lake (VIP)", value: "lake-vip" },
      { title: "Brahma Temple (VIP)", value: "brahma-temple-vip" },
      { title: "Evening Pushkar Lake aarti", value: "evening-aarti" },
      { title: "Local storyteller", value: "storyteller" },
      { title: "Full darshan package", value: "package" },
      { title: "Other", value: "other" },
    ]),
    stringList(
      "included",
      "Included stops",
      "Optional. One entry per place or person included in this visit.",
    ),
    questionNotes(
      "Optional mythology notes, such as why the Brahma temple is only in Pushkar.",
    ),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "featuredImage",
      category: "category",
    },
    prepare({ title, media, category }) {
      return {
        title: title || "Untitled darshan",
        media,
        subtitle: category || "Darshan",
      };
    },
  },
});
