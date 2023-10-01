import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getHotArticles } from '~/services/article/apis';
import { toMs } from '~/utils';

interface UseHotArticlesOptions {
  keyword: string;
}

export const useHotArticles = (
  options: Partial<UseHotArticlesOptions> = {}
) => {
  const { keyword } = options;
  const queryKey = queryKeys.articles.hot(keyword);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getHotArticles({
        cursor: pageParam,
        keyword,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
    staleTime: toMs(60),
  });
};
