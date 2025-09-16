import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project", // ✅ schema name
  title: "Project", // ✅ display name in Studio
  type: "document", // ✅ always a document
  fields: [
    defineField({
      name: "id",
      title: "Project ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tech Tags",
      type: "array",
      of: [{ type: "string" }], // ✅ list of technologies
    }),
    defineField({
      name: "image",
      title: "Project Image / Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Backend", value: "backend" },
          { title: "Chatbot", value: "chatbot" },
          { title: "Graphic", value: "graphic" },
          { title: "Fullstack", value: "fullstack" },
        ],
        layout: "dropdown", // 👈 dropdown select hoga
      },
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub Repository",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
