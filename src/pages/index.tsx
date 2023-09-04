import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import { useMyAccountStatus, useMyInfo } from '~/services/member';
import { webStorage } from '~/utils/webStorage';

const HomePage = () => {
  const router = useRouter();
  const { isFetching } = useMyInfo({ enabled: true, retry: 1 });
  const { isRegisterRequired } = useMyAccountStatus();

  useEffect(() => {
    if (isFetching) return;

    // User Register가 필요한 경우에는 <Background />에서 Register 페이지로 리다이렉션을 트리거합니다.
    if (!isRegisterRequired) {
      const returnPage = webStorage.getSignInReturnPage();

      router.replace(returnPage).then(() => {
        webStorage.clearSignInReturnPage();
      });
    }
  }, [isRegisterRequired, router, isFetching]);

  return <DefaultFullPageLoader text={loaderText.checkUser} />;
};

export default HomePage;
