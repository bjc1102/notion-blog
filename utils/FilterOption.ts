export const handleSelectClick =
  (
    categoryName: string,
    setState: (value: React.SetStateAction<string>) => void
  ) =>
  () => {
    setState(categoryName);
  };
