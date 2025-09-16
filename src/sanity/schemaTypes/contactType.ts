import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact", // ✅ schema name
  title: "Contact", // ✅ display name in Studio
  type: "document", // ✅ always a document
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(), // ✅ list of technologies
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "number",
      validation: (rule) => rule.required(), // 1 se 10 scale
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(), // ✅ list of technologies
    }),

    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Url Link",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Url Link",
      type: "url",
    }),
  ],
});
