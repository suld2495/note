import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login', () => {
  test('아이디와 비밀번호를 입력하지 않고 로그인 버튼 클릭 시 입력 안내 문구가 나온다.', async () => {
    render(<Login />, { wrapper: RecoilRoot });

    const idInput = screen.getByLabelText('아이디');
    userEvent.clear(idInput);

    const passwordInput = screen.getByLabelText('비밀번호');
    userEvent.clear(passwordInput);

    const idAlert = screen.queryByText('아이디를 입력하세요');
    expect(idAlert).not.toBeInTheDocument();

    const passwordAlert = screen.queryByText('비밀번호를 입력하세요');
    expect(passwordAlert).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: '로그인' });
    userEvent.click(button);

    const idAlertAfter = await screen.findByText('아이디를 입력하세요');
    expect(idAlertAfter).toBeInTheDocument();

    const passwordAlertAfter = screen.getByText('비밀번호를 입력하세요');
    expect(passwordAlertAfter).toBeInTheDocument();
  });

  test('잘못 된 아이디와 비밀번호 입력시 에러메시지를 출력한다.', async () => {
    render(<Login />, { wrapper: RecoilRoot });

    const idInput = screen.getByLabelText('아이디');
    userEvent.type(idInput, '잘못된 아이디');

    const passwordInput = screen.getByLabelText('비밀번호');
    userEvent.type(passwordInput, '잘못된 비밀번호');

    const button = screen.getByRole('button', { name: '로그인' });
    userEvent.click(button);

    const alert = await screen.findByText('아이디 또는 비밀번호가 오류입니다.');
    expect(alert).toBeInTheDocument();
  });

  test('정상적인 아이디와 비밀번호 입력 시 메인 페이지로 이동한다.', async () => {
    render(
      <MemoryRouter basename="/login" initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
      { wrapper: RecoilRoot }
    );

    const idInput = screen.getByLabelText('아이디');
    userEvent.type(idInput, '정상 아이디');

    const passwordInput = screen.getByLabelText('비밀번호');
    userEvent.type(passwordInput, '정상 비밀번호');

    const button = screen.getByRole('button', { name: '로그인' });
    userEvent.click(button);

    await waitFor(() => {
      expect(global.location.pathname).toBe('/');
    });
  });
});
