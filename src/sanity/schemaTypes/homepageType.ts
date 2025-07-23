import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'systemMessage',
      title: 'System Message (English)',
      type: 'text',
      description: 'Initial system message displayed with typing animation.',
    }),
    defineField({
      name: 'transitionMessage',
      title: 'Transition Message (English)',
      type: 'text',
      description: 'Message displayed during the bug-like transition.',
    }),
    defineField({
      name: 'choiceTitle',
      title: 'Choice UI Title (Japanese)',
      type: 'string',
      description: 'Title for the interactive choice section (e.g., "選択").',
    }),
    defineField({
      name: 'deepThinkButtonText',
      title: 'Deep Think Button Text (Japanese)',
      type: 'string',
      description: 'Text for the "深く考える" button.',
    }),
    defineField({
      name: 'justWatchButtonText',
      title: 'Just Watch Button Text (Japanese)',
      type: 'string',
      description: 'Text for the "ただ観る" button.',
    }),
    defineField({
      name: 'deepThinkContent',
      title: 'Deep Think Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
      description: 'Content displayed when "深く考える" is chosen.',
    }),
    defineField({
      name: 'justWatchContent',
      title: 'Just Watch Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
      description: 'Content displayed when "ただ観る" is chosen.',
    }),
  ],
});
