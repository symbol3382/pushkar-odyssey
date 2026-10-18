import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      description:
        "Describe the image for someone who cannot see it. English is required when an image is uploaded.",
      validation: (rule) =>
        rule.custom((value: { en?: string } | undefined, context) => {
          const parent = context.parent as
            { asset?: { _ref?: string } } | undefined;
          if (!parent?.asset?._ref) return true;
          if (!value?.en?.trim()) return "Alt text in English is required";
          return true;
        }),
    }),
  ],
});
