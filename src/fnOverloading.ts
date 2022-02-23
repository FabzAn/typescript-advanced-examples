function curryMe(a: string): (b: number) => string;
function curryMe(a: string, b: number): string;
function curryMe(a: string, b?: number) {
  if (b === undefined) {
    return (nowB: number) => curryMe(a, nowB);
  }
  return a.charAt(b);
}

const curryRetA = curryMe("abc");
const curryRetB = curryMe("abc", 2);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Taken from TS docs
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // <- not allowed

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

function takeUndefined(a: string): string;
function takeUndefined(a: string, b: number | undefined): boolean;
function takeUndefined(...args: [string] | [string, number | undefined]) {
  if (args.length === 2) {
    const secondParam = args[1];
    return secondParam === undefined ? false : secondParam > 0;
  }
  return args[0];
}
// function takeUndefined(a: string, b?: number) {
//   if (arguments.length === 2) {
//     return b === undefined ? false : b > 0;
//   }
//   return a;
// }

const undefRetA = takeUndefined("abc");
const undefRetB = takeUndefined("abc", 3);
const undefRetC = takeUndefined("abc", undefined);
