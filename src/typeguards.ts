// Primitives

const testValue: unknown = undefined;

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isNull(v: unknown): v is null {
  return v === null;
}

function isObject(v: unknown): v is object {
  return typeof v === "object" && v !== null;
}

// isNumber, isUndefined, etc.

if (isString(testValue)) {
  testValue;
}

if (isNull(testValue)) {
  testValue;
}

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// No check for correctness. Be careful.
function isNull2(v: unknown): v is null {
  return v === undefined;
}

if (isNull2(testValue)) {
  testValue;
}

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Combinators

function typeguardOr<T, K>(
  checkT: (v: unknown) => v is T,
  checkK: (v: unknown) => v is K
): (v: unknown) => v is T | K {
  return (v: unknown): v is T | K => checkT(v) || checkK(v);
}

if (typeguardOr(isString, isObject)(testValue)) {
  testValue;
}

// Common cases can be simplified

function isNullOr<T>(
  check: (v: unknown) => v is T
): (v: unknown) => v is T | null {
  return (v): v is T | null => v === null || check(v);
}

if (isNullOr(isString)(testValue)) {
  testValue;
}

// Watch out when T and K are not mutually exclusive

function typeguardNot<T, K>(
  check: (v: unknown) => v is T
): (v: T | K) => v is K {
  return (v: T | K): v is K => !check(v);
}

// One of the most useful typeguards

function isDefined<T>(v: T | undefined): v is T {
  return v !== undefined;
}

const optionalValues = [1, 2, undefined, 4];
const onlyDefinedValues = optionalValues.filter(isDefined);

function isArrayAndEveryElement<T>(
  check: (v: unknown) => v is T
): (a: unknown) => a is T[] {
  return (a): a is T[] => Array.isArray(a) && a.every(check);
}

if (isArrayAndEveryElement(isString)(testValue)) {
  testValue;
}

// Arbitrary combination

const complexTypeguard = typeguardOr(
  isNull,
  isArrayAndEveryElement(typeguardOr(isString, isObject))
);

if (complexTypeguard(testValue)) {
  testValue;
}

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Objects

type TypeSpec<T> = { [K in keyof T]: (v: unknown) => v is T[K] };

function conformsTo<T>(typeSpec: TypeSpec<T>): (v: unknown) => v is T {
  return (v): v is T =>
    typeof v === "object" &&
    v !== null &&
    Object.keys(typeSpec).every((k) =>
      (typeSpec as { [key: string]: (v: unknown) => boolean })[k](
        (v as { [key: string]: unknown })[k]
      )
    );
}

type ExampleType = {
  a: string;
  b: string[];
  c: null | string;
};

const exampleSpec: TypeSpec<ExampleType> = {
  a: isString,
  b: isArrayAndEveryElement(isString),
  c: isNullOr(isString),
};

const isExample = conformsTo(exampleSpec);

if (isExample(testValue)) {
  testValue;
}

// Inline types work

if (conformsTo({ e: isString, f: isNull })(testValue)) {
  testValue;
}
