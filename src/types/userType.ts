export interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  role?: string,
};

export interface IUserLogin {
  username: string,
  password: string,
};

export interface IVideo {
  _id?: any | null,
  title: string,
  description: string,
  linkId: string,
  userShared: IUser,
};

export interface IShareVideoState {
  errMsg: string | object,
  isError: boolean,
  isFetching: boolean,
  sharedVideos: Array<IVideo>,
};

export interface IYoutubeURL {
  youtubeUrl: string,
};
