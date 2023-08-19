import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  Logo,
  SsafyIcon,
  DefaultFullPageLoader,
  PageHead,
  PageHeadingText,
  loaderText,
} from '~/components/Common';
import SignInButton from '~/components/SignInButton';
import { useMyAccountStatus } from '~/services/member';
import { flex, pageMinHeight } from '~/styles/utils';
import { routes } from '~/utils/routes';

const metaTitle = '로그인';
const metaDescription =
  'SSAF SOUND 로그인 페이지입니다. 소셜 계정으로 로그인이 가능합니다.';

const SignInPage = () => {
  const { isAuthenticated, isChecking } = useMyAccountStatus();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace(routes.main());
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  if (isChecking) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.signIn(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <div css={logoContainerCss}>
          <SsafyIcon.LogoCharacter />
          <Logo size="lg" />
        </div>

        <div css={buttonGroupCss}>
          <SignInButton.Google />
          <SignInButton.GitHub />
          <SignInButton.Kakao />
          <SignInButton.Apple />
        </div>
      </div>
    </>
  );
};

export default SignInPage;

const selfCss = css(
  {
    height: '100vh',
    minHeight: pageMinHeight,
    padding: '60px 0',
  },
  flex('', 'center', 'column', '15vh')
);

const logoContainerCss = css(flex('center', 'center', 'column', 18));

const buttonGroupCss = css({ padding: 30 }, flex('', '', 'column', 10));
