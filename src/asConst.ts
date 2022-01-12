const fakeConst = {
  a: 12,
  b: ["a", "b"],
};

const trueConst = {
  a: 12,
  b: ["a", "b"],
} as const;

fakeConst.a = 2;
// trueConst.a = 2;

const fakeNumber = fakeConst.a;
const trueNumber = trueConst.a;

const fakeString = fakeConst.b[1];
const trueString = trueConst.b[1];
