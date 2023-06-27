import { css } from '@emotion/react';
import { useEffect, useId, useRef, useState } from 'react';

import {
  Icon,
  IconButton,
  AlertText,
  TextInput,
  Button,
  Modal,
  VisuallyHidden,
} from '~/components/Common';
import { Alert } from '~/components/ModalContent';
import {
  createRandomNickname,
  nicknameValidator,
  useUpdateMyInfoFormContext,
  useValidateNickname,
} from '~/services/member';
import { flex, palettes } from '~/styles/utils';

import Question from '../Question';

const fieldName = 'nickname';

interface NicknameProps {
  isMutating?: boolean;
}

const Nickname = (props: NicknameProps) => {
  const { isMutating = false } = props;
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const { mutate: validateNickname, isLoading: isValidatingNickname } =
    useValidateNickname();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    setValue,
    setFocus,
    resetField,
    getValues,
    trigger,
    formState: { errors, dirtyFields },
  } = useUpdateMyInfoFormContext();
  const nicknameFieldId = useId();
  const errorMessage = errors.nickname?.message;
  const submittable = isValidNickname && !dirtyFields.nickname;
  const isButtonDisabled = !isValidNickname && !dirtyFields.nickname;
  const isButtonLoading = isValidatingNickname || isMutating;

  const closeSubmitModal = () => setSubmitModalOpen(false);
  const openSubmitModal = () => setSubmitModalOpen(true);

  const handleCreateRandomNickname = () => {
    setValue(fieldName, createRandomNickname(), {
      shouldDirty: true,
    });
    setFocus(fieldName);
  };

  const handleValidateNickname = async () => {
    const nickname = getValues(fieldName);
    const passClientValidate = await trigger(fieldName);
    if (!passClientValidate) return;

    if (submittable) {
      openSubmitModal();
      return;
    }

    validateNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsValidNickname(true);
          openSubmitModal();
        },
        onError: () => {
          setIsValidNickname(false);
        },
        onSettled: () => {
          resetField(fieldName, { defaultValue: nickname });
        },
      }
    );
  };

  const triggerSubmit = () => {
    submitButtonRef.current?.click();
    closeSubmitModal();
  };

  useEffect(() => {
    resetField(fieldName, { defaultValue: '' });
    setFocus(fieldName);
  }, [resetField, setFocus]);

  return (
    <div css={selfCss}>
      <label htmlFor={nicknameFieldId}>
        <Question>
          <Question.Row>닉네임을</Question.Row>
          <Question.Row>입력해주세요</Question.Row>
        </Question>
      </label>

      <div css={inputContainerCss}>
        <div css={refreshNicknameCss}>
          <p>랜덤 닉네임 생성</p>
          <IconButton size={32} onClick={handleCreateRandomNickname}>
            <Icon name="refresh" size={28} />
          </IconButton>
        </div>
        <TextInput
          placeholder="James"
          size="lg"
          type="text"
          autoComplete="off"
          id={nicknameFieldId}
          {...register(fieldName, {
            validate: nicknameValidator,
          })}
        />
        {errorMessage && <AlertText>{errorMessage}</AlertText>}
      </div>

      <Button
        type="button"
        css={buttonCss}
        size="lg"
        onClick={handleValidateNickname}
        loading={isButtonLoading}
        disabled={isButtonDisabled}
      >
        확인
      </Button>

      {submittable && (
        <>
          <Modal
            open={submitModalOpen}
            onEscapeKeyDown={closeSubmitModal}
            onPointerDownOutside={closeSubmitModal}
            content={
              <Alert
                title="알림"
                description={
                  <p>
                    닉네임을{' '}
                    <strong style={{ color: palettes.primary.darken }}>
                      {getValues(fieldName)}
                    </strong>
                    (으)로 설정하시겠습니까?
                  </p>
                }
                actionText="확인"
                cancelText="취소"
                onClickAction={triggerSubmit}
                onClickCancel={closeSubmitModal}
              />
            }
          />

          <VisuallyHidden>
            <button type="submit" ref={submitButtonRef} aria-hidden />
          </VisuallyHidden>
        </>
      )}
    </div>
  );
};

export default Nickname;

const buttonCss = css({ width: '100%' });

const selfCss = css(
  {
    height: '100%',
  },
  flex()
);

const inputContainerCss = css(
  {
    flexGrow: 1,
    marginTop: 40,
  },
  flex('', '', 'column', 10)
);

const refreshNicknameCss = css(flex('center', 'flex-end', 'row', 8));
