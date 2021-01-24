import { omit } from "lodash/fp";

type BData = {
  a: string;
  b: string;
};

type FData = {
  a: string;
  b: Date;
  c: string[];
  d: number;
};

type FKeys = Exclude<keyof FData, keyof BData>;

const omitBackendProps: (
  data: FData
) => Omit<FData, FKeys> & Record<FKeys, never> = omit(["c", "d"]);
