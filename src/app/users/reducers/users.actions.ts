import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Users] Login',
    props<{email: string}>()
);
export const logout = createAction(
    '[Users] Logout',
);
