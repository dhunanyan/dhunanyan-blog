import { Document } from '@contentful/rich-text-types';

export type MediaResponseType = {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
    };
  };
};

export type BlogResponseType = {
  items: {
    fields: {
      id: string;
      image: MediaResponseType;
      title: string;
      lastUpdated: string;
      content: Document;
    };
  }[];
};
