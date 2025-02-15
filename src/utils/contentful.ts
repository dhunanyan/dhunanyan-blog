import { createClient } from 'contentful';
import { parsePreviewBlogs, parseBlog } from './parsers';

import { BlogPreviewModel, BlogModel } from '@models';
import { BlogResponseType } from '@config';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID + '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN + '',
});

export const getPreviewBlogs = async (): Promise<
  BlogPreviewModel[] | undefined
> => {
  try {
    const entries = (await client.getEntries({
      content_type: 'portfolioBlog',
      // eslint-disable-next-line
      // @ts-ignore
      select: 'fields',
      // order: "fields.name"
    })) as unknown as BlogResponseType;

    return parsePreviewBlogs(entries);
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (
  blogId: string
): Promise<BlogModel | undefined> => {
  try {
    const entries = (await client.getEntries({
      content_type: 'portfolioBlog',
      // eslint-disable-next-line
      // @ts-ignore
      select: 'fields',
      // order: "fields.name"
    })) as unknown as BlogResponseType;

    return parseBlog(
      entries.items.find(({ fields: { id } }) => id === blogId)!
    );
  } catch (error) {
    console.log(error);
  }
};
