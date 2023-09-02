import { configureStore } from '@reduxjs/toolkit'
import { recipeReducer, userReducer } from './reducers'

export default configureStore({
	reducer: {
		users: userReducer,
		recipes: recipeReducer
	}
})