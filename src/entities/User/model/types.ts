export type UserType = {
  id?: string;
  nickname: string;
  profile_image_url?: string;
};

export type LoginType = UserType & {
  email: string;
  password: string;
};
