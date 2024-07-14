export const queryKeys = {
  posts: 'posts',
};

export type QueryKeysType = (typeof queryKeys)[keyof typeof queryKeys];

export const filterEmptyKeys = (
  queryKey: (string | number | undefined | null)[],
) => {
  return queryKey.filter((item) => item || item === 0) as (string | number)[];
};

export default queryKeys;
