import { omit } from "ramda";
// import { omit } from "lodash/fp";

type BData = {
  a: string;
  b: string;
};

type FData = {
  a: string;
  b: Date; // Differs from BData.b
  c: string[]; // Missing on BData
  // d: number;
};

// This should be infered
type TargetType = {
  a: string;
  b: Date;
  c?: never;
  d?: never;
};

type FKeys = Exclude<keyof FData, keyof BData>;

const omitBackendProps: (
  data: FData
) => Omit<FData, FKeys> & { [k in FKeys]?: never } = omit(["c"]);

const compareOmitBackendProps = omit(["c"]);

// #############################################################################

const testFData: FData = {
  a: "",
  b: new Date(),
  c: [""],
  // d: 1,
};

const omitted = omitBackendProps(testFData);

const compareOmitted = compareOmitBackendProps(testFData);
