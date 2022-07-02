import { atom } from 'recoil';
import { User } from '../services/auth/auth.api';

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

export default {};
