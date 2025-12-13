export const truncateString = ({ maxLength, str }: { str: string; maxLength: number }): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
};
