import { defineArrayMember, defineField, type FieldDefinition } from "sanity";

type LocaleKind = "localeString" | "localeText" | "localeBlockContent";

export function requiredLocale(
  name: string,
  title: string,
  kind: LocaleKind,
  description?: string,
) {
  return defineField({
    name,
    title,
    type: kind,
    description,
    validation: (rule) =>
      rule.custom((value) => {
        if (kind === "localeBlockContent") {
          const english = (value as { en?: unknown[] } | undefined)?.en;
          if (!Array.isArray(english) || english.length === 0)
            return "English text is required";
          return true;
        }
        const english = (value as { en?: string } | undefined)?.en;
        if (!english?.trim()) return "English text is required";
        return true;
      }),
  });
}

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  description:
    "Used in the page address. Generate it from the English title. Avoid changing it after the page has been shared.",
  options: { source: "title.en", maxLength: 96 },
  validation: (rule) =>
    rule.required().custom((slug) => {
      const current = slug?.current;
      if (!current) return "Slug is required";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) {
        return "Use lowercase letters, numbers, and hyphens only";
      }
      return true;
    }),
});

export const featuredField = defineField({
  name: "featured",
  title: "Featured",
  type: "boolean",
  description:
    "Show this item in featured sections when the home page does not pin a selection.",
  initialValue: false,
});

export const sortOrderField = defineField({
  name: "sortOrder",
  title: "Display order",
  type: "number",
  description:
    "Lower numbers appear first. Leave at 0 to sort with other items.",
  initialValue: 0,
  validation: (rule) => rule.integer(),
});

export const seoField = defineField({
  name: "seo",
  title: "SEO",
  type: "seo",
});

export function stringList(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: "array",
    description,
    of: [defineArrayMember({ type: "localeString" })],
  });
}

export function imageField(
  name: string,
  title: string,
  required: boolean,
  description?: string,
): FieldDefinition {
  return defineField({
    name,
    title,
    type: "galleryImage",
    description,
    validation: required
      ? (rule) =>
          rule.custom((value: { asset?: { _ref?: string } } | undefined) =>
            value?.asset?._ref ? true : "An image is required",
          )
      : undefined,
  });
}

export const publishingNote =
  "Save a draft while you work. Choose Publish when the entry is complete. Unpublished drafts are not shown on the website. Do not publish an entry that is missing its title, slug, or image.";

export function choiceField(
  name: string,
  title: string,
  list: { title: string; value: string }[],
  options?: {
    description?: string;
    layout?: "radio" | "dropdown";
    required?: boolean;
  },
) {
  const required = options?.required !== false;
  return defineField({
    name,
    title,
    type: "string",
    description: options?.description,
    options: { list, layout: options?.layout ?? "radio" },
    validation: required ? (rule) => rule.required() : undefined,
  });
}

export function catalogFields(): FieldDefinition[] {
  return [
    requiredLocale("title", "Title", "localeString"),
    slugField,
    requiredLocale(
      "summary",
      "Short description",
      "localeText",
      "Shown on cards.",
    ),
    requiredLocale("description", "Full description", "localeBlockContent"),
    imageField("featuredImage", "Featured image", true),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
    }),
    defineField({ name: "price", title: "Starting price", type: "price" }),
    defineField({
      name: "enquiryNote",
      title: "Enquiry instructions",
      type: "localeText",
      description:
        "Optional. Explain how to enquire. Do not say a booking is confirmed.",
    }),
    featuredField,
    sortOrderField,
    seoField,
  ];
}

export function questionNotes(description: string) {
  return defineField({
    name: "notes",
    title: "Questions and answers",
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "object",
        name: "note",
        fields: [
          requiredLocale("question", "Question", "localeString"),
          requiredLocale("answer", "Answer", "localeText"),
        ],
        preview: {
          select: { title: "question.en" },
          prepare({ title }) {
            return { title: title || "Question" };
          },
        },
      }),
    ],
  });
}
