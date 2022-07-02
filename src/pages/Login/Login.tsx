import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useAlert from '../../hooks/useAlert';
import { UserForm } from './types';
import useLogin from '../../hooks/useLogin';
import { userErrorState } from '../../atoms/user';

const LoginBlock = styled(Box)({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

const Login = () => {
  const { state, handleClose, handleOpen } = useAlert();
  const [validation, setValidation] = useState<Record<keyof UserForm, boolean>>({
    userId: false,
    password: false,
  });
  const [form, setForm] = useState<UserForm>({
    userId: '',
    password: '',
  });
  const error = useRecoilValue(userErrorState);
  const { login } = useLogin();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const valitate = () => {
    setValidation({
      userId: !form.userId,
      password: !form.password
    });

    return Object.values(validation).some((value) => value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!valitate()) {
      login(form);
    }
  };

  useEffect(() => {
    if (error) {
      handleOpen();
    }
  }, [error]);

  return (
    <LoginBlock component="form" onSubmit={onSubmit}>
      <TextField
        error={validation.userId}
        name="userId"
        label="아이디"
        variant="outlined"
        helperText={validation.userId ? '아이디를 입력하세요' : ''}
        value={form.userId}
        onChange={onChange}
      />
      <TextField
        error={validation.password}
        name="password"
        label="비밀번호"
        variant="outlined"
        helperText={validation.password ? '비밀번호를 입력하세요' : ''}
        value={form.password}
        onChange={onChange}
      />
      <Button variant="contained" type="submit">
        로그인
      </Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          아이디 또는 비밀번호가 오류입니다.
        </Alert>
      </Snackbar>
    </LoginBlock>
  );
};

export default Login;
