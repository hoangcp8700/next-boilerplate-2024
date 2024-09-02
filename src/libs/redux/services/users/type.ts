export type UserStateType = {
  id: string;
  name: string;
  email: string;
};

export type UserRequest = Pick<UserStateType, 'email' | 'name'>;
