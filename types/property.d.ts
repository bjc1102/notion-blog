export interface PageProperty {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: Createdby;
  last_edited_by: Createdby;
  cover: Cover;
  icon?: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

interface Properties {
  Slug: Slug;
  Updated: Updated;
  Number: INumber;
  Description: Description;
  Type: Description;
  Published: Published;
  Created: Updated;
  Category: Tags;
  Name: Name;
  Tag: Tag;
}

export interface Name {
  id: string;
  type: string;
  title: function[];
}

export interface Category {
  id: string;
  color: string;
  name: string;
}

interface Published {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface Description {
  id: string;
  type: string;
  rich_text: function[];
}

export interface Tag {
  id: string;
  type: string;
  rich_text: function[];
}

interface INumber {
  id: string;
  type: string;
  number: number;
}

interface Updated {
  id: string;
  type: string;
  last_edited_time: string;
}

interface Slug {
  id: string;
  type: string;
  formula: function[];
}

interface Parent {
  type: string;
  database_id: string;
}

export interface Cover {
  type: string;
  file: File;
  external?: {
    url: string;
  };
}

interface File {
  url: string;
  expiry_time: string;
}

interface Createdby {
  object: string;
  id: string;
}
