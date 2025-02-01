import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../models/user-with-tokens/IUserWithTokens.ts";

type AuthSliceType = {
    user: IUserWithTokens  | null;
    isAuthenticated : boolean;
}

const initialState: AuthSliceType = {user: null, isAuthenticated : false}

export const authSlice = createSlice({
    name: 'authorization',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserWithTokens >) => {
            state.user = action.payload;
            state.isAuthenticated  = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated  = false;
        }
    }
})

export const authSliceActions = {
    ...authSlice.actions,
}