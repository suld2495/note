import { useRecoilState, useSetRecoilState } from 'recoil';
import { userErrorState, userState } from '../atoms/user';
import { UserForm } from '../pages/Login/types';
import * as authApi from '../services/auth/auth.api';

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const setLoginError = useSetRecoilState(userErrorState);

  const login = async (form: UserForm) => {
    try {
      const response = await authApi.login(form);
      setUser(response);
    } catch {
      setLoginError(true);
    }
  };

  return {
    user,
    login
  };
};

export default useAuth;
