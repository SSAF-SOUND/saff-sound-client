import type { UsePollLunchMenuParams } from '~/services/lunch/hooks/usePollLunchMenu';
import type { LunchMenusWithPollStatus } from '~/services/lunch/utils';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { revertPolledLunchMenu } from '~/services/lunch/apis';
import { useSetLunchMenusWithPollStatusWithImmer } from '~/services/lunch/hooks/useSetLunchMenuWithPollStatus';

export type UseRevertPolledLunchMenuParams = UsePollLunchMenuParams;

export const useRevertPolledLunchMenu = (
  params: UseRevertPolledLunchMenuParams
) => {
  const { campus, dateSpecifier } = params;

  const queryClient = useQueryClient();
  const setLunchMenusWithPollStatusWithImmer =
    useSetLunchMenusWithPollStatusWithImmer({
      campus,
      dateSpecifier,
    });

  const queryKey = queryKeys.lunch.list({ campus, dateSpecifier });

  const invalidateLunchMenusWithPollStatus = () => {
    queryClient.invalidateQueries({
      queryKey: queryKey,
    });
  };

  return useMutation({
    mutationFn: (variables: { lunchId: number; polledIndex: number }) =>
      revertPolledLunchMenu(variables.lunchId),
    onMutate: async (variables) => {
      const { polledIndex } = variables;
      const lunchMenusWithPollStatus =
        queryClient.getQueryData<LunchMenusWithPollStatus>(queryKey);

      if (!lunchMenusWithPollStatus) return;

      setLunchMenusWithPollStatusWithImmer((target) => {
        if (!target) return;

        target.polledAt = -1;
        target.menus[polledIndex].pollCount -= 1;
      });

      return { prevLunchMenusWithPollStatus: lunchMenusWithPollStatus };
    },
    onError: (err, _, context) => {
      const prevLunchMenusWithPollStatus =
        context?.prevLunchMenusWithPollStatus;
      queryClient.setQueryData<LunchMenusWithPollStatus>(
        queryKey,
        prevLunchMenusWithPollStatus
      );
    },
    onSuccess: () => {
      invalidateLunchMenusWithPollStatus();
    },
  });
};
