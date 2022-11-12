import { FilterOption } from '@/types/filter';

export const getRouterPath = (filterOption: FilterOption) => {
  const path: string[] = [];
  Object.keys(filterOption).map((v) => {
    //@ts-ignore
    const check = filterOption[v];
    if (!!check) path.push(`${v}=${check}`);
  });

  return path.length ? `?${path.join('&')}` : '';
};
