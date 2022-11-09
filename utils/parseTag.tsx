import Tag from '@/components/Tag';

export const parseTag = (str: string) => {
  return str.replaceAll(/ /g, '').split(',');
};

export const tagSpread = (tags: string[]) =>
  tags.map((v) => <Tag key={v} tag={v} />);
