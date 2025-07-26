import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'author_info',
      title: 'Author Information',
      type: 'text',
      rows: 3,
      description: 'Information about the author of the article.',
    }),
    defineField({
      name: 'contact_link',
      title: 'Contact Link',
      type: 'url',
      description: 'A URL for contacting the author or related information.',
    }),
    defineField({
      name: 'copyright_notice',
      title: 'Copyright Notice',
      type: 'text',
      rows: 2,
      description: 'Copyright information for the article.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})