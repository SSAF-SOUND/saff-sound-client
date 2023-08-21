import type { LunchMenuDetail } from '~/services/lunch';

import { css } from '@emotion/react';
import React, { memo } from 'react';

import { lunchCardMinHeight } from '~/components/Lunch/LunchCard/utils';
import { flex, palettes } from '~/styles/utils';

import { LunchCardMenuDescription } from './LunchCardMenuDescription';
import { LunchCardPollButton } from './LunchCardPollButton';

export interface LunchCardProps {
  polled?: boolean;
  menu: LunchMenuDetail;
  order: number;
  onPolledChange: (polled: boolean) => void;
  pollButtonDisabled?: boolean;
}

export const LunchCard = memo((props: LunchCardProps) => {
  const {
    polled = false,
    menu,
    order,
    onPolledChange,
    pollButtonDisabled,
  } = props;
  const { pollCount } = menu;

  return (
    <div css={selfCss}>
      <LunchCardMenuDescription order={order} menu={menu} />

      <LunchCardPollButton
        css={{ width: likeButtonWidth }}
        pollCount={pollCount}
        polled={polled}
        onPolledChange={onPolledChange}
        disabled={pollButtonDisabled}
      />
    </div>
  );
});

LunchCard.displayName = 'LunchCard';

const descriptionMinWidth = 200;
const likeButtonWidth = 100;

const selfMinWidth = descriptionMinWidth + likeButtonWidth;

const selfCss = css(
  {
    position: 'relative',
    backgroundColor: palettes.white,
    borderRadius: 20,
    overflow: 'hidden',
    color: palettes.black,
    minHeight: lunchCardMinHeight,
    height: '100%',
    minWidth: selfMinWidth,
  },
  flex('stretch', '', 'row')
);