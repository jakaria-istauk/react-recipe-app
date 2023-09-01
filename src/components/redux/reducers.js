import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function filterUsersByEmail(arr, emailToMatch) {
    return arr.filter(user => user.email === emailToMatch);
  }
export const getUserByEmail = (email) => {
    let data = JSON.parse( window.localStorage.getItem( 'my_recipe_app' ) );

    if( ! data || !data?.users ){
        return false;
    }

    return data.users.filter(user => user.email === email);


    return false;
}
export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        registerUser: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { registerUser, getUser } = userSlice.actions
export const userReducer = userSlice.reducer