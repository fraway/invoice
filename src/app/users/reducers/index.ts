import { createFeature, createReducer, on } from "@ngrx/store";
import { login, loginSuccess, logout } from "./users.actions";

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
    on(loginSuccess, (state, { username }) => ({
      ...state,
      isLoggedIn: true,
      username: username
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
  selectUsername
} = usersFeature;
