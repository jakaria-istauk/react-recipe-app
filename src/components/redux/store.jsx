import { configureStore } from "@reduxjs/toolkit";
import { recipeReducer, userReducer } from "./reducers";

export default configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
  },
});
