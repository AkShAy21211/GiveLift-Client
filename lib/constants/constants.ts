export const AUTH_ROUTES = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
  logout: "/auth/logout",


  adminLogin: "/admin/auth/sign-in",
};

export const ADMIN_ROUTE={
  createCoordinator:"/admin/create-coordinator",
  getCoordinators:"/admin/coordinators",
}

export const DISASTER_ROUTES = {
  report: "/disaster/report",
  list: "/disaster",
  view: "/disaster/:id",
};

export const USER_ROUTE = {
  profile: "/user/me",
  updateProfie: "/user/update-profile",
};

export const PROFILE_MENU = [
  {
    name: "Profile",
    route: "/profile",
  },
  {
    name: "Donations",
    route: "/donations",
  },
  {
    name: "Reports",
    route: "/reports",
  },
];

export const ADMIN_MENU = [
  {
    name: "Dashboard",
    route: "/admin/dashboard",
  },
  {
    name: "Disaster",
    route: "/admin/disasters",
  },
  {
    name: "Donations",
    route: "/admin/donations",
  },
  {
    name: "News",
    route: "/admin/news",
  },
  {
    name: "Cordinators",
    route: "/admin/cordinators",
  },
  {
    name: "Volunteers",
    route: "/admin/volunteersv",
  },
  {
    name: "Users",
    route: "/admin/users",
  },
  {
    name: "Chats",
    route: "/admin/chats",
  },
];
