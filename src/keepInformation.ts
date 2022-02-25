type A = {
  commonProp: string;
  otherPropAAA: string;
};

type B = {
  commonProp: string;
  otherPropBBB: string;
};

// Naive approach

function bad(input: A | B): A | B {
  return {
    ...input,
    commonProp: "do something",
  };
}

const testA: A = {
  commonProp: "",
  otherPropAAA: "",
};

const badA = bad(testA);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Keep former type information

function good<T extends A | B>(input: T): T {
  return {
    ...input,
    commonProp: "do something",
  };
}

const goodA = good(testA);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// No dependency on A or B => EZ unit tests

function better<T extends { commonProp: string }>(input: T): T {
  return {
    ...input,
    commonProp: "do something",
  };
}

const betterA = better(testA);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Some dependency on A => Changes to A.commonProp may be automatic

function maybeUseful<T extends Pick<A, "commonProp">>(input: T): T {
  return {
    ...input,
    commonProp: "do something",
  };
}

const maybeUsefulA = maybeUseful(testA);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Also useful when objects are extended

function extendObj<T extends { commonProp: string }>(
  input: T
): T & { newProp: string } {
  return {
    ...input,
    newProp: input.commonProp + " new content",
  };
}

const extendObjA = extendObj(testA);

// #############################################################################
// #                                                                           #
// #                                                                           #
// #                                                                           #
// #############################################################################

// Real world example

function findAudioWithContentLinkMatching<
  Audio extends { id: number },
  ContentLink extends { targetId: number }
>(
  predicate: (contentLink: ContentLink) => boolean,
  {
    audios,
    contentLinks,
  }: {
    audios: (Audio | null)[] | null;
    contentLinks: (ContentLink | null)[] | null;
  }
) {
  if (!audios || !contentLinks) {
    return undefined;
  }

  return audios.find((a) => {
    const matchingLink = contentLinks
      .filter(isNotNull)
      .find((cl) => a?.id === cl.targetId);
    return matchingLink !== undefined && predicate(matchingLink);
  });
}
