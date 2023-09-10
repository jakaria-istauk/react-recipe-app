import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserFullName, userPostHash } from "../../hooks/helper";
import { isLoggedIn } from "../../hooks/authentication";

export const getUserByEmail = (email) => {
    let data = JSON.parse( window.localStorage.getItem( 'my_recipe_app' ) );

    if( ! data || !data?.users ){
        return false;
    }

    let user = data.users.filter(user => user.email === email);

    return user?.[0];
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {username:getUserFullName('full_name'), postHash:userPostHash(), isLoggedIn:isLoggedIn},
    reducers: {
        registerUser: (state, action) => {
            state.push(action.payload);
        },
        loginUser:(state, action) => {
            state.isLoggedIn = isLoggedIn;
            state.username = getUserFullName('full_name');
            state.postHash = userPostHash();
        },
        logoutUser:(state, action) => {
            state.isLoggedIn = false;
            state.username = '';
            state.postHash = '';
        }
    }
});

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        addNewRecipe: (state, action) => {
            state.push(action.payload);
        },
        updateRecipe: (state, action) => {
            console.log(action.payload);
            return state.filter((item) => item.id !== action.payload);
        }
    }
});

export const { registerUser,loginUser, logoutUser } = userSlice.actions
export const userReducer = userSlice.reducer


export const { addNewRecipe, updateRecipe } = recipeSlice.actions
export const recipeReducer = recipeSlice.reducer