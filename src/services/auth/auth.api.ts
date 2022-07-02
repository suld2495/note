import { UserForm } from '../../pages/Login/types';
import request from '../http';

export type User = {
  userId: string;
  name: string;
};

export const login = (form: UserForm): Promise<User> => {
  return request('POST', '/login', form);
};

export default {};
