import { omit } from "ramda";
// import { omit } from "lodash/fp";

type BackendData = {
  a: string;
  b: string;
};

type FrontendData = {
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
  // d?: never;
};

type FKeys = Exclude<keyof FrontendData, keyof BackendData>;

const omitBackendProps: (
  data: FrontendData
) => Omit<FrontendData, FKeys> & { [k in FKeys]?: never } = omit(["c"]);

const compareOmitBackendProps = omit(["c"]);

// #############################################################################

const testFData: FrontendData = {
  a: "",
  b: new Date(),
  c: [""],
  // d: 1,
};

const omitted = omitBackendProps(testFData);

const compareOmitted = compareOmitBackendProps(testFData);
