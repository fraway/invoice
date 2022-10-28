import { createAction, props } from "@ngrx/store";
import { User } from "./models";

export const autoLogin = createAction(
    '[Auth Service] Login on init',
    props<{ id: string }>()
);

export const login = createAction(
    '[Login Page] Login',
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Auth Effects] Login Successful',
    props<User>()
);

export const loginFailure = createAction(
    '[Auth Effects] Login Failure',
    props<{ message: string }>()
);

export const logout = createAction(
    '[Users] Logout',
);