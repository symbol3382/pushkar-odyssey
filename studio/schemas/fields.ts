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
    validation: (rule) =>
      rule.custom(
        (
          value:
            { asset?: { _ref?: string }; alt?: { en?: string } } | undefined,
        ) => {
          if (!value?.asset?._ref)
            return required ? "An image is required" : true;
          if (!value.alt?.en?.trim()) return "Alt text in English is required";
          return true;
        },
      ),
  });
}

export const publishingNote =
  "Save a draft while you work. Choose Publish when the entry is complete. Unpublished drafts are not shown on the website. Do not publish an entry that is missing its title, slug, or image.";
