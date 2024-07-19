export function provideTagDetail<T extends string, R extends string | number>(
  tagType: T,
  resultsWithId: R | undefined,
) {
  return [{ type: tagType, id: resultsWithId }];
}

export function provideTagList<
  T extends string,
  R extends { id: string | number }[],
>(tagType: T, resultsWithIds: R | undefined) {
  return resultsWithIds
    ? [
        ...provideTagDetail(tagType, 'List'),
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : provideTagDetail(tagType, 'List');
}
