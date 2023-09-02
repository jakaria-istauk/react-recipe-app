import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserByEmail = (email) => {
    let data = JSON.parse( window.localStorage.getItem( 'my_recipe_app' ) );

    if( ! data || !data?.users ){
        return false;
    }

    let user = data.users.filter(user => user.email === email);

    return user?.[0];
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

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        addNewRecipe: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { registerUser } = userSlice.actions
export const userReducer = userSlice.reducer


export const { addNewRecipe } = recipeSlice.actions
export const recipeReducer = recipeSlice.reducer