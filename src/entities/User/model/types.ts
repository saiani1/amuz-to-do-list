export type UserType = {
  id?: string;
  email?: string;
  nickname: string;
  profile_image_url?: string;
};

export type LoginType = UserType & {
  password: string;
};
