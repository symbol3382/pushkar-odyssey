import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import {
  filterDocumentActions,
  filterNewDocumentOptions,
  structure,
} from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "SANITY_STUDIO_PROJECT_ID is not set. Copy studio/.env.example to studio/.env and add the project ID from https://www.sanity.io/manage. Do not add an API token.",
  );
}

export default defineConfig({
  name: "pushkar-tour",
  title: "Pushkar Oddessey",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous, context) =>
      filterNewDocumentOptions(previous, context),
    actions: (previous, context) =>
      filterDocumentActions(previous, context.schemaType),
  },
});
