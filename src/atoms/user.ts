import { atom, useRecoilState } from 'recoil';
import { JoinForm } from '../pages/Join/types';
import { User } from '../services/auth/auth.api';
import * as authApi from '../services/auth/auth.api';

export const userState = atom<User>({
  key: 'userState',
  default: {
    userId: '',
    name: ''
  }
});

export const userErrorState = atom({
  key: 'userErrorState',
  default: false
});

export const joinErrorState = atom({
  key: 'joinErrorState',
  default: false
});

export const useJoin = () => {
  const [, setError] = useRecoilState(joinErrorState);
  const [, setUser] = useRecoilState(userState);

  const join = async (form: JoinForm) => {
    try {
      const response = await authApi.join(form);
      setUser(response);
    } catch {
      setError(true);
    }
  };

  return {
    join
  };
};

export default {};
