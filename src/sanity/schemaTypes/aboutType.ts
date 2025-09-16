import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about", // ✅ schema name
  title: "About", // ✅ display name in Studio
  type: "document", // ✅ always a document
  fields: [
    defineField({
      name: "title",
      title: "About Title1",
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
      name: "description1",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "description2",
      title: "Description",
      type: "text",
    }),
  ],
});
