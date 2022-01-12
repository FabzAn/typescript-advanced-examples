import { nth } from "ramda";

const modifiableStringArray = ["a", "b"];
const readonlyStringArray: readonly string[] = ["a", "b"];

function takesReadonly(input: readonly string[]): string | undefined {
  return nth(3, input);
}
function takesModifiable(input: string[]): string | undefined {
  return nth(3, input);
}

takesReadonly(modifiableStringArray);
takesReadonly(readonlyStringArray);

takesModifiable(modifiableStringArray);
// takesModifiable(readonlyStringArray);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Don't do this
function givesReadonly(input: string[]): readonly string[] {
  return [...input];
}
function givesModifiable(input: string[]): string[] {
  return [...input];
}

// givesReadonly(["a", "b"]).sort()
givesModifiable(["a", "b"]).sort();

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

function legitReadonlyReturn(): readonly string[] {
  const arr = ["a", "b"];

  setTimeout(() => {
    console.log(arr[0] + arr[1]);
    // arr.sort() <- is allowed
  }, 500);

  return arr;
}
