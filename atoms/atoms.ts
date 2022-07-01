import { atom } from 'recoil';
import { BlogPost } from '../types/schema';
import { nanoid } from 'nanoid';

export const postsState = atom<BlogPost[]>({
  key: nanoid(),
  default: [],
});

export const propertyState = atom({
  key: nanoid(),
  default: {},
});
