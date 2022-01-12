function selectionMissing<
  K extends keyof T,
  T extends { [key in K]: unknown[] }
>(...fields: K[]): (object: T) => boolean {
  return (object): boolean => fields.some((k) => object[k].length === 0);
}

const exampleObj = {
  a: [1, 2, 3],
  b: ["a"],
  c: [],
  d: "asdf",
};

const isABorCMissing = selectionMissing("a", "b", "c");
const somethingMissing = isABorCMissing(exampleObj);
