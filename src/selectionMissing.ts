function selectionMissing<
  K extends keyof T,
  T extends { [key in K]: unknown[] }
>(...fields: K[]): (object: T) => boolean {
  return (object): boolean => fields.some((k) => object[k].length === 0);
}
