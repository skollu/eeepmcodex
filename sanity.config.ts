import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/schemas";
import { structure } from "@/sanity.structure";

export default defineConfig({
  name: "eee-property-management",
  title: "EEE Property Management",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/admin",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes
  }
});
