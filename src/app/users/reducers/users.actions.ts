import { createAction, props } from "@ngrx/store";

export const setLoginStatus = createAction(
    '[Users] Login'
);
export const setLogoutStatus = createAction(
    '[Users] Logout',
);