import { defineField, defineType } from "sanity";
import { imageField, publishingNote, requiredLocale } from "../fields";

const optionalUrl = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "url",
    description: "Optional. Use a full https:// address.",
    validation: (rule) =>
      rule.uri({ scheme: ["http", "https"], allowRelative: false }),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description: publishingNote,
  fields: [
    requiredLocale("name", "Site name", "localeString"),
    imageField(
      "logo",
      "Logo",
      false,
      "Optional. Shown beside the site name. If empty, the website keeps its current mark.",
    ),
    imageField(
      "favicon",
      "Favicon",
      false,
      "Optional. The built-in icon is used until this is published.",
    ),
    requiredLocale("description", "Short description", "localeText"),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value) return true;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Enter a valid email address";
          return true;
        }),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      description: "Shown as the call link. Include the country code.",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      description:
        "Country code and number, digits only. This opens a chat. It does not confirm a booking.",
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value) return true;
          const digits = value.replace(/\D/g, "");
          if (digits.length < 8 || digits.length > 15)
            return "Enter 8 to 15 digits, including the country code";
          return true;
        }),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    optionalUrl("mapUrl", "Map link"),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "localeText",
      description: "Optional extra line in the footer.",
    }),
    defineField({
      name: "enquiryTemplate",
      title: "Enquiry message",
      type: "localeText",
      description:
        "Optional WhatsApp message. You can use {{type}}, {{title}}, {{slug}}, and {{details}}. The website adds the page address itself. Sending this message does not confirm a booking.",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      description: "Used when a page does not have its own SEO fields.",
    }),
  ],
  preview: {
    select: { title: "name.en", media: "logo" },
    prepare({ title, media }) {
      return { title: title || "Site settings", media };
    },
  },
});
