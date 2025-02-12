
export const AUTH_ROUTES={

    login:"/auth/sign-in",
    register:"/auth/sign-up",
    logout:"/auth/logout",
}

export const DISASTER_ROUTES={
    create:"/disasters/create",
    list:"/disaster",
    view:"/disasters/:id",

}

export const USER_ROUTE={
    profile:"/user/me",
    updateProfie:"/user/update-profile",
}

export const PROFILE_MENU =[
    {
        name:"Profile",
        route:"/profile",
    },
    {
        name:"Donations",
        route:"/donations",
    },
    {
        name:"Reports",
        route:"/reports",
    },

]