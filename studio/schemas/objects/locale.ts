import { defineArrayMember, defineField, defineType } from "sanity";
import { languages } from "../languages";

function localeFields(kind: "string" | "text") {
  return languages.map((language) =>
    defineField({
      name: language.id,
      title: language.title,
      type: kind,
      description:
        language.id === "en"
          ? "Write this in English. The website uses English when another language is empty."
          : "Optional. Leave empty to show the English text.",
    }),
  );
}

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: localeFields("string"),
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: localeFields("text"),
});

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: languages.map((language) =>
    defineField({
      name: language.id,
      title: language.title,
      type: "array",
      description:
        language.id === "en"
          ? "Required. Use headings and paragraphs. Do not paste raw HTML."
          : "Optional. Leave empty to show the English text.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
  ),
});
