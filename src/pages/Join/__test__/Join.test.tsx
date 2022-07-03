import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import Join from '../Join';

type ValidationOption = {
  labelText: string;
  inputText?: string;
  errorMessage: string;
  not: boolean;
};

const expectValidation = (option: ValidationOption) => {
  const { labelText, inputText, errorMessage, not } = option;
  const input = screen.getByLabelText(labelText);
  const inputAlert = screen.queryByText(errorMessage);
  const expectObj = expect(inputAlert);

  if (not && inputText) {
    userEvent.type(input, inputText);
    expectObj.not.toBeInTheDocument();
  } else {
    userEvent.type(input, '123');
    // userEvent.click(document.querySelector('body'));
    expectObj.toBeInTheDocument();
  }
};

describe('Join', () => {
  it('입력 필드에 벨리데이션 체크가 실패하면 에러 문구가 출력된다.', () => {
    render(<Join />, { wrapper: RecoilRoot });

    const validateBy =
      (option: Omit<ValidationOption, 'not'>) => (not: boolean) => {
        expectValidation({
          ...option,
          not,
        });
      };

    const idValidation = validateBy({
      labelText: '아이디',
      inputText: '정상적인 아이디',
      errorMessage: '아이디를 입력하세요',
    });
    const passwordValidation = validateBy({
      labelText: '비밀번호',
      inputText: '정상적인 비밀번호',
      errorMessage: '비밀번호를 입력하세요',
    });
    const nameValidation = validateBy({
      labelText: '이름',
      inputText: '이름',
      errorMessage: '이름을 입력하세요',
    });
    const passwordCheckValidation = validateBy({
      labelText: '비밀번호 확인',
      inputText: '정상적인 비밀번호',
      errorMessage: '비밀번호가 일치하지 않습니다',
    });

    // idValidation(true);
    // passwordValidation(true);
    // nameValidation(true);
    // passwordCheckValidation(true);

    idValidation(false);
    passwordValidation(false);
    nameValidation(false);
    passwordCheckValidation(false);

    expect(1).toBe(1);
  });
});
