// Just an example. Use builtin ReturnType<T> for this

type RetType<T> = T extends (v: unknown) => infer K ? K : never;

function testFn(v: string): number {
  return v.length;
}
type UnwrappedRetType = RetType<typeof testFn>;

// This may be useful in practice

type UnwrapPromise<T> = T extends Promise<infer K> ? K : never;

type UnwrappedPromiseType = UnwrapPromise<Promise<string>>;
