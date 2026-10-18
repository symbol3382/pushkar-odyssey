import { defineField, defineType } from "sanity";

export const price = defineType({
  name: "price",
  title: "Starting price",
  type: "object",
  description:
    "Optional. Leave this empty when the price is on enquiry. A number here is a starting price, not a confirmed quote.",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      description:
        "Do not enter a guess. Leave empty until the business confirms a starting price.",
      validation: (rule) => rule.min(0).precision(2),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "INR",
      options: {
        list: [
          { title: "INR", value: "INR" },
          { title: "USD", value: "USD" },
          { title: "EUR", value: "EUR" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "note",
      title: "Price note",
      type: "localeString",
      description:
        'Optional qualifier, such as "per person". Do not use this to invent a price.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value: { amount?: number; currency?: string } | undefined) => {
      if (value?.amount == null) return true;
      if (!value.currency) return "Choose a currency when you enter an amount";
      return true;
    }),
});
