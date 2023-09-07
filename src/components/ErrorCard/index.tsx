import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

import ButtonLoader from '../Common/Button/ButtonLoader';

interface ErrorCardProps {
  className?: string;
  style?: CSSProperties;
  onClickRetry?: () => void;
  isLoading?: boolean;
  buttonText?: string;
}

const ErrorCard = (props: ErrorCardProps) => {
  const {
    onClickRetry,
    isLoading = false,
    buttonText = '재시도',
    ...restProps
  } = props;
  return (
    <div css={selfCss} {...restProps}>
      <p>데이터 로딩중 문제가 발생했습니다</p>
      <p css={{ marginBottom: 20 }}>잠시 후 다시 시도해주세요</p>
      <Button
        onClick={onClickRetry}
        theme="error"
        style={{ color: 'white' }}
        disabled={isLoading}
      >
        {buttonText}
        {isLoading && (
          <ButtonLoader css={{ 'margin-left': 20 }} color={palettes.white} />
        )}
      </Button>
    </div>
  );
};

export default ErrorCard;

const selfCss = css(
  {
    width: '100%',
    minHeight: 160,
    backgroundColor: palettes.background.grey,
    borderRadius: 16,
  },
  flex('center', 'center'),
  fontCss.style.R18
);
