import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        registerUser: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { registerUser } = userSlice.actions

export const userReducer = userSlice.reducer