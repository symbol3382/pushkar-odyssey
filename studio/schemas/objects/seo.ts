import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  description:
    "Optional search and sharing text. If you leave this empty, the website uses the title and summary.",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "localeString",
      description:
        "Shown in the browser tab and search results. Keep it specific to this page.",
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "localeText",
      description: "A short summary for search results and link previews.",
    }),
    defineField({
      name: "image",
      title: "Sharing image",
      type: "galleryImage",
      description:
        "Used when the page is shared. Alt text is required if you add an image.",
    }),
  ],
});
