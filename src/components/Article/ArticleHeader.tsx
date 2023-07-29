import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';
import dayjs from 'dayjs';

import { Icon, IconButton, Separator } from '~/components/Common';
import Name from '~/components/Name';
import { flex, fontCss } from '~/styles/utils';

const formatCreatedAt = (dateString: string) => {
  const dayjsInstance = dayjs(dateString);
  const formattedDate = dayjsInstance.format('MM-DD');
  const formattedTime = dayjsInstance.format('hh:mm');

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

interface ArticleHeaderProps {
  articleDetail: ArticleDetail;
}

const ArticleHeader = (props: ArticleHeaderProps) => {
  const { articleDetail } = props;
  const { author, createdAt } = articleDetail;
  const { date, time } = formatCreatedAt(createdAt);

  return (
    <header css={selfCss}>
      <div css={metaCss}>
        {/* FIXME: userInfo type */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Name userInfo={author} size="md" />
        <time dateTime={createdAt} css={timeCss}>
          <span>{date}</span>
          <Separator
            orientation="vertical"
            css={{ margin: '0 8px' }}
            height={16}
          />
          <span>{time}</span>
        </time>
      </div>

      <IconButton size={24}>
        <Icon name="more" size={24} />
      </IconButton>
    </header>
  );
};

export default ArticleHeader;

const selfCss = css(flex('center', 'space-between', 'row'));
const metaCss = css(flex('center', '', 'row', 10));
const timeCss = css(fontCss.style.R12, flex('center', '', 'row'));
