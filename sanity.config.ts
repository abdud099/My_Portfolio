"use client";

/**
 * This configuration is used for the Sanity Studio that’s mounted on the `/src/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes/index";
import { structure } from "./src/sanity/structure";

// 👉 Import your custom schema(s)
// import { skillType } from "./src/sanity/schemaTypes/skillType";

// If you have multiple schemas, you can put them here OR use `./src/sanity/schemaTypes`
// const schema = {
//   types: [skillType], // ✅ Add skill schema
// };

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
