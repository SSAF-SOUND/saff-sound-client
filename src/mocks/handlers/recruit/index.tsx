import type {
  RecruitDetail,
  recruitMembersType,
  Recruits,
  RecruitScrap,
  RecruitScrapApiData,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

import { RecruitData } from './data';

export const getRecruits = restSuccess<Recruits>(
  'get',
  composeUrls(API_URL, endpoints.recruit.list()),
  {
    data: RecruitData.recruits,
  }
);

export const getRecruitMembers = restSuccess<recruitMembersType>(
  'get',
  composeUrls(API_URL, endpoints.recruit.members(1)),
  {
    data: RecruitData.recruitMembers,
  }
);

export const getRecruitDetail = restSuccess<RecruitDetail>(
  'get',
  composeUrls(API_URL, endpoints.recruit.detail(1)),
  {
    data: RecruitData.recruitDetail.project,
  }
);

export const getRecruitScrap = restSuccess<RecruitScrap>(
  'get',
  composeUrls(API_URL, endpoints.recruit.scrap(1)),
  {
    data: RecruitData.RecruitScrap,
  }
);

export const postRecruitScrap = rest.post(
  composeUrls(API_URL, endpoints.recruit.scrap(1)),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };

    const scrapId = 1;
    const article = RecruitData.RecruitScrap;
    const delta = article.scrapCount ? 1 : -1;
    article.scrapCount += delta;
    const latestScrapCount = article.scrapCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<RecruitScrapApiData['data']>(ctx, {
        scrapCount: latestScrapCount,
      })
    );
  }
);

export const recruitHandlers = [
  getRecruitDetail,
  getRecruits,
  getRecruitMembers,
  getRecruitScrap,
  postRecruitScrap,
];
