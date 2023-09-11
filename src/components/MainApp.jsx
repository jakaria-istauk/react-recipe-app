import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { store } from './redux'

const MainApp = () => {
  return (
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  )
}

store.subscribe(( t )=>{
	window.localStorage.setItem( 'my_recipe_app', JSON.stringify( store.getState() ) )
})

export default MainApp;
