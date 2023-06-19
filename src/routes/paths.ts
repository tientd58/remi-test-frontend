import { lazy } from 'react'

import { PATH_NAME } from './pathName';

const Signin = lazy(() =>
  import('../pages/Signin').then(module => ({
    default: module.default,
  })),
);
const Signup = lazy(() =>
  import('../pages/Signup').then(module => ({
    default: module.default,
  })),
);
const ShareVideo = lazy(() =>
  import('../pages/ShareVideo').then(module => ({
    default: module.default,
  })),
);
const ListVideo = lazy(() =>
  import('../pages/ListVideo').then(module => ({
    default: module.default,
  })),
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then(module => ({
    default: module.NotFound,
  })),
);

export const AuthorRoots = [
  {
    key: 'home',
    name: 'Home',
    path: PATH_NAME.ROOT,
    element: ListVideo,
  },
  {
    key: 'share-video',
    name: 'Share Video',
    path: PATH_NAME.SHARE_VIDEO,
    element: ShareVideo,
  },
  {
    key: 'list-video',
    name: 'List Video',
    path: PATH_NAME.LIST_VIDEO,
    element: ListVideo,
  },
  {
    key: 'not-found',
    name: 'Not Found',
    path: PATH_NAME.NOT_FOUND,
    element: NotFound,
  },
];

export const AuthenRoots = [
  {
    key: 'default',
    name: 'Default',
    path: PATH_NAME.ROOT,
    element: Signin,
  },
  {
    key: 'signin',
    name: 'Signin',
    path: PATH_NAME.SIGNIN,
    element: Signin,
  },
  {
    key: 'signup',
    name: 'Signup',
    path: PATH_NAME.SIGNUP,
    element: Signup,
  },
  {
    key: 'not-found',
    name: 'Not Found',
    path: PATH_NAME.NOT_FOUND,
    element: NotFound,
  },
];
