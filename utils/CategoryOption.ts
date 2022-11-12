const categoryTypeMap = {
  TEST: 'bg-black',
  개발상식: 'bg-indigo-700',
  일간회고: 'bg-yellow-800',
  주간회고: 'bg-green-800',
  월간회고: 'bg-red-900',
};

export const filterCategoryOption = () => (v: string) => v !== 'TEST';

export const AllCategory = Object.keys(categoryTypeMap).filter(
  filterCategoryOption()
);

export default categoryTypeMap;
