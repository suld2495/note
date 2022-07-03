import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { UserForm } from './types';
import useLogin from '../../hooks/useLogin';
import { userErrorState, userState } from '../../atoms/user';

const LoginBlock = styled(Box)`
  color: darkslategray;
  background-color: aliceblue;
  padding: 8;
  border-radius: 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 800px;
    display: flex;
    border: 1px solid #b9b9b9;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
    gap: 20px;
  }

  button {
    height: 50px;
  }

`;

const Login = () => {
  const { state, handleClose, handleOpen } = useAlert();
  const [validation, setValidation] = useState<Record<keyof UserForm, boolean>>({
    userId: false,
    password: false,
  });
  const [form, setForm] = useState<UserForm>({ userId: '', password: '' });
  const [error, setError] = useRecoilState(userErrorState);
  const user = useRecoilValue(userState);
  const { login } = useLogin();
  const navigate = useNavigate();

  const validate = (_form: UserForm) => {
    setValidation({
      userId: !_form.userId,
      password: !_form.password,
    });

    return Object.values(validation).some((value) => value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setValidation({
      ...validation,
      [name]: !value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);

    if (!validate(form)) {
      login(form);
    }
  };

  useEffect(() => {
    if (error) {
      handleOpen();
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <LoginBlock>
      <Box component="form" onSubmit={onSubmit}>
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
      </Box>
    </LoginBlock>
  );
};

export default Login;
