import type { ApiErrorResponse } from '~/types';

import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { Toast } from '~/components/Common';

interface HandleAxiosErrorOptions {
  /**
   * 콘솔에 표시되는 에러 메세지 앞에 붙는 메세지입니다.
   */
  tag: string;
  /**
   * - `statusCode`값이 `500`이상일 때, 토스트에 표시할 메세지입니다.
   * - 서버측 메세지보다 상단에 표시됩니다.
   * - 기본값은 "서버에서 알 수 없는 오류가 발생했습니다" 입니다.
   */
  clientMessageOnServerError: string;
  /**
   * - `statusCode`값이 `500`이상일 때, 토스트에 표시할 서버측 에러 메세지입니다.
   * - 유저에게 필요 없는 정보일 수 있으므로, 기본적으로 development 모드에서만 `true`입니다.
   */
  showServerMessage: boolean;
  /**
   * - `statusCode`값이 `400 ~ 499` (=클라이언트 오류)일 때  수행할 함수입니다.
   */
  onClientError: (error: ApiErrorResponse) => void;
}

export const handleAxiosError = (
  error: unknown,
  options: Partial<HandleAxiosErrorOptions> = {}
) => {
  const {
    tag = '',
    clientMessageOnServerError = '서버에서 알 수 없는 오류가 발생했습니다.',
    showServerMessage = process.env.NODE_ENV === 'development',
    onClientError,
  } = options;

  if (!isAxiosError<ApiErrorResponse>(error) || !error.response) {
    const unknownErrorMessage = [tag, 'Unknown Error']
      .filter(Boolean)
      .join(' ');
    console.error(unknownErrorMessage);
    return;
  }

  const statusCode = error.response.status;

  /* Server Error */
  if (statusCode >= 500) {
    toast((t) => (
      <Toast.ServerError
        t={t}
        clientMessage={clientMessageOnServerError}
        serverMessage={error.response?.data?.message}
        showServerMessage={showServerMessage}
      />
    ));

    return;
  }

  /* Client Error */
  if (400 <= statusCode && statusCode < 500) {
    onClientError?.(error.response.data);
  }
};
