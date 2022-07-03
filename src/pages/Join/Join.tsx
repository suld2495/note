import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { JoinForm } from './types';

const JoinBlock = styled(Box)({

});

const Join = () => {
  const [validation, setValidation] = useState<Record<keyof JoinForm, boolean>>({
    userId: false,
    password: false,
    passwordCheck: false,
    name: false
  });
  const [form, setForm] = useState<JoinForm>({
    userId: '',
    password: '',
    passwordCheck: '',
    name: ''
  });

  return (
    <JoinBlock component="form">
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
        helperText={validation.passwordCheck ? '비밀번호가 일치하지 않습니다' : ''}
        value={form.passwordCheck}
        onChange={onChange}
      />
    </JoinBlock>
  )
};
  
export default Join;