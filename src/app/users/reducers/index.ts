import { createFeature, createReducer, on } from "@ngrx/store";
import { setLoginStatus, setLogoutStatus } from "./users.actions";

export interface UsersState {
    isLoggedIn: boolean;
    username: string | undefined;
}

const initialState: UsersState = {
    isLoggedIn: false,
    username: ""
};

export const usersFeature = createFeature({
    name: 'users',
    reducer: createReducer<UsersState>(
        initialState,
        on(setLoginStatus, (state) => ({
            ...state,
            isLoggedIn: true,
        })),
        on(setLogoutStatus, (state) => ({
            ...state,
            isLoggedIn: false,
        })),
    ),
});

export const {
    name, // feature name
    reducer, // feature reducer
    selectIsLoggedIn
} = usersFeature;