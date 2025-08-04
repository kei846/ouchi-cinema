import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'choices',
      title: 'Choices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'e.g., /category/deep-think'
            },
          ],
        },
      ],
    }),
  ],
});
