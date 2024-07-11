import {title} from 'process'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of the blog post',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of the blog post',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Main image',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}
