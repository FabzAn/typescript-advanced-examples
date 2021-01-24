import { omit } from "ramda";

type BData = {
  a: string;
  b: string;
};

type FData = {
  a: string;
  b: Date; // Differs from BData.b
  c: string[]; // Missing on BData
};

type FKeys = Exclude<keyof FData, keyof BData>;

const omitBackendProps: (
  data: FData
) => Omit<FData, FKeys> & { [k in FKeys]?: never } = omit(["c"]);

// #############################################################################

const testFData: FData = {
  a: "",
  b: new Date(),
  c: [""],
};

const omitted = omitBackendProps(testFData);
