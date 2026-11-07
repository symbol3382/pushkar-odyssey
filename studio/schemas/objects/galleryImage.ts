import { defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
});
