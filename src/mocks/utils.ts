import type { RestContext } from 'msw';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

import { RESPONSE_CODE } from '~/utils';

/**
 * - 성공 응답에 거의 `data`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockSuccess(ctx, { token: '1234' }))
 */
export const mockSuccess = <D>(
  ctx: RestContext,
  data: D,
  code = '',
  message = '',
  statusCode = 200
) => {
  const isValidStatusCode = statusCode >= 200 && statusCode < 400;
  return [
    ctx.status(isValidStatusCode ? statusCode : 200),
    ctx.json<ApiSuccessResponse<D>>({
      data,
      code,
      message,
    }),
  ] as const;
};

/**
 * - 실패 응답에 거의 `code`, `message`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockError(ctx, 'error-code', 'error-message'))
 */
export const mockError = (
  ctx: RestContext,
  code = '',
  message = '',
  statusCode = 400
) => {
  const isValidStatusCode = statusCode >= 400 && statusCode < 600;
  return [
    ctx.status(isValidStatusCode ? statusCode : 400),
    ctx.json<ApiErrorResponse>({ code, message, data: null }),
  ] as const;
};

export const mockExpiredTokenError = (ctx: RestContext) => {
  return mockError(ctx, RESPONSE_CODE.EXPIRED_TOKEN);
};

export const mockInvalidTokenError = (ctx: RestContext) => {
  return mockError(ctx, RESPONSE_CODE.INVALID_TOKEN);
};
