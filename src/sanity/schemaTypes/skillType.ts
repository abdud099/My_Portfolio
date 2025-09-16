// /schemas/skillType.ts
import { defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skill", // unique document name
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Chatbot", value: "chatbot" },
          { title: "Graphic", value: "graphic" },
          { title: "Tools", value: "tools" },
        ],
        layout: "dropdown", // 👈 dropdown select hoga
      },
    }),
    defineField({
      name: "level",
      title: "Proficiency Level",
      type: "number",
      validation: (rule) => rule.required().min(1).max(100), // 1 se 10 scale
    }),
    defineField({
      name: "icon",
      title: "Icon / Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
