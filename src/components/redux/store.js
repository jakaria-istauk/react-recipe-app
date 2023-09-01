import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers'

export default configureStore({
	reducer: {
		users: userReducer
	}
})