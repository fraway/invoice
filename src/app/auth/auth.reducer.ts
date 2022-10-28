import { createFeature, createReducer, on } from "@ngrx/store";
import { loginSuccess, logout } from "./auth.actions";

export interface AuthState {
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer<AuthState>(
        initialState,
        on(loginSuccess, (state) => ({
            ...state,
            isLoggedIn: true
        })),
        on(logout, (state) => ({
            ...state,
            isLoggedIn: false,
        })),
    ),
});

export const {
    name, // feature name
    reducer, // feature reducer
    selectIsLoggedIn,
} = authFeature;
