import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import { Toggle } from '~/components/Common';
import { useGetQueryString, useSetQueryString } from '~/hooks';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';
import { stringBooleanToBool } from '~/utils';

const IS_RECRUITING_CONSTANT = 'isRecruiting';

export const IsRecruitingToggle = () => {
  const category = useGetQueryString('category');

  const isRecruiting = useGetQueryString(IS_RECRUITING_CONSTANT, {
    parser: stringBooleanToBool,
  });

  const setIsRecruitingTrue = useSetQueryString(IS_RECRUITING_CONSTANT, true);
  const setIsRecruitingFalse = useSetQueryString(IS_RECRUITING_CONSTANT, false);

  const handleOnPressedChange = (pressed: boolean) => {
    if (pressed) {
      setIsRecruitingTrue();
    } else {
      setIsRecruitingFalse();
    }
  };

  const theme = getRecruitThemeByCategory(
    (category ?? 'project') as RecruitCategory
  );
  return (
    <Toggle
      thumbSize={20}
      textWidth={40}
      text="모집 중"
      css={selfCss}
      defaultPressed={isRecruiting as boolean}
      onPressedChange={handleOnPressedChange}
      theme={theme}
    />
  );
};

const selfCss = css(
  fontCss.family.auto,
  fontCss.style.R12,
  flex('center', 'center', 'row'),
  {
    padding: 0,
    margin: 0,
    '> *': {
      padding: 0,
      margin: 0,
    },
    height: 28,
    width: 72,
    cursor: 'pointer',
  }
);