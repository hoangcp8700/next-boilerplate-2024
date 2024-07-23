import { AppRoles } from './enum';

export const RouterName = {
  '404': '/404',
  comingSoon: '/coming-soon',
  home: '/',
  posts: '/posts',
  users: '/users',
  login: '/login',
  signUp: '/signup',

  profile: '/profile',
  // dashboard
  dashboard: {
    home: '/dashboard/',
    users: '/dashboard/users',
    posts: '/dashboard/posts',
  },
};

export const publicRouter = [
  RouterName[404],
  RouterName.comingSoon,
  RouterName.home,
  RouterName.users,
  RouterName.posts,
];

export const authRouter = [RouterName.login, RouterName.signUp];

export const privateRouter = [RouterName.profile];

interface RouteConfigItem {
  default: string;
  routes: string[];
}

export const clientRouter = [...publicRouter, ...authRouter, ...privateRouter];
export const dashboardRouter = [
  RouterName.dashboard.users,
  RouterName.dashboard.posts,
];

export const validPaths: string[] = [...clientRouter, ...dashboardRouter];

export const routeConfig: Record<string, RouteConfigItem> = {
  auth: {
    default: RouterName.login,
    routes: authRouter,
  },

  [AppRoles.User]: {
    default: RouterName.home,
    routes: clientRouter,
  },
  [AppRoles.Admin]: {
    default: `${RouterName.dashboard.home}?role=admin`, // should change component for admin role
    routes: [...clientRouter, ...dashboardRouter],
  },
  [AppRoles.CustomerSupport]: {
    default: RouterName.dashboard.home,
    routes: [...clientRouter, RouterName.dashboard.posts],
  },
};
