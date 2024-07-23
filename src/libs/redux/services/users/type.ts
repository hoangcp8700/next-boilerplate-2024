import { AppRoles } from '@/shares/constants/enum';

export type UserStateType = {
  id: string;
  name: string;
  email: string;
  role: AppRoles;
};

export type UserRequest = Pick<UserStateType, 'email' | 'name'>;
