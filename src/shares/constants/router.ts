export const RouterName = {
  '404': '/404',
  comingSoon: '/coming-soon',

  // without data
  home: '/',
  about: '/about',
  blogs: '/blogs',

  // with data
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

export const clientRouter = [...publicRouter, ...authRouter, ...privateRouter];
export const dashboardRouter = [
  RouterName.dashboard.users,
  RouterName.dashboard.posts,
];

export const validPaths: string[] = [...clientRouter, ...dashboardRouter];
