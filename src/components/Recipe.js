import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { store } from './redux'

const Recipe = () => {
  return (
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  )
}

store.subscribe(( t )=>{
	window.localStorage.setItem( 'my_recipe_app', JSON.stringify( store.getState() ) )
})

export default Recipe;
