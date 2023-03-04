export interface FilterOption {
  category: string;
  search: string;
  tags: string;
}

export type handleChangeProps = (
  setState: React.Dispatch<React.SetStateAction<FilterOption>>,
  name: string
) => (e: React.SyntheticEvent) => void;
