/**
 * Filters out empty, null, and undefined values from an object.
 * Useful for cleaning up filter objects before passing them to API requests.
 *
 * @template T - The type of the input object
 * @param obj - The object to filter, can be null or undefined
 * @returns A new object containing only entries with non-empty values
 *
 * @example
 * const filter = { search: 'john', age: undefined, city: '' };
 * filterObjectEntries(filter); // { search: 'john' }
 */
export const filterObjectEntries = <T extends Record<string, any>>(obj: T | null | undefined): Partial<T> => {
  if (!obj) {
    return {};
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};
