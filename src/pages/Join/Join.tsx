import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import { JoinForm } from './types';
import { joinErrorState, useJoin, userState } from '../../atoms/user';
import useAlert from '../../hooks/useAlert';

const JoinBlock = styled(Box)`
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

const Join = () => {
  const { state, handleClose, handleOpen } = useAlert();
  const [error, setError] = useRecoilState(joinErrorState);
  const { join } = useJoin();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [validation, setValidation] = useState<Record<keyof JoinForm, boolean>>(
    {
      userId: false,
      password: false,
      passwordCheck: false,
      name: false,
    }
  );
  const [form, setForm] = useState<JoinForm>({
    userId: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  const validate = (_form: JoinForm) => {
    Object.entries(_form).forEach(([key, value]) => {
      setValidation((prev) => ({
        ...prev,
        [key]: !value,
      }));
    });

    if (_form.password !== _form.passwordCheck) {
      setValidation((prev) => ({
        ...prev,
        passwordCheck: true
      }));
    }

    return Object.values(validation).some((value) => value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setValidation({
      ...validation,
      [name]: !value
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);

    if (!validate(form)) {
      return;
    }

    join(form);
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
    <JoinBlock>
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
          error={validation.name}
          name="name"
          label="이름"
          variant="outlined"
          helperText={validation.name ? '이름을 입력하세요' : ''}
          value={form.name}
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
        <TextField
          error={validation.passwordCheck}
          name="passwordCheck"
          label="비밀번호 확인"
          variant="outlined"
          helperText={
            validation.passwordCheck ? '비밀번호가 일치하지 않습니다' : ''
          }
          value={form.passwordCheck}
          onChange={onChange}
        />
        <Button variant="contained" type="submit">
          회원가입
        </Button>
      </Box>

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
    </JoinBlock>
  );
};

export default Join;
