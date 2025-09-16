import { type SchemaTypeDefinition } from "sanity";
import { skillType } from "./skillType";
import { projectType } from "./projectType"; // 👉 if you also want projects
import { aboutType } from "./aboutType";
import { contactType } from "./contactType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, projectType, aboutType, contactType], // ✅ now at least one document type exists
};
