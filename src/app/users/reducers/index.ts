import { createFeature, createReducer } from "@ngrx/store";

export interface UsersState {
  username: string | undefined;
}

const initialState: UsersState = {
  username: ""
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer<UsersState>(
    initialState,
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectUsername
} = usersFeature;
