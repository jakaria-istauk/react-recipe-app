import React from 'react'
import General from './layouts/General';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedContent from './layouts/ProtectedContent';
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';
import Recipes from './layouts/RecipeLayouts/Recipes';
import RecipeForm from './layouts/RecipeLayouts/RecipeForm';
import Recipe from './layouts/RecipeLayouts/Recipe';
import RecipeDetails from './layouts/RecipeLayouts/RecipeDetails';

export const routes = [
    {
        path: '/',
        exact: true,
        element: <General/>,
        name: 'Home',
        children: [
            {
                element: <ProtectedContent/>,
                children:[
                    {
                        index: true,
                        element: <Recipes/>
                    },
                    {
                        path: '/recipe/add',
                        element: <RecipeForm/>
                    },
                    {
                        path: '/recipe/:id',
                        element: <RecipeDetails/>
                    },
                    {
                        path: '/recipe/edit/:id',
                        element: <RecipeForm/>
                    },
                ]
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/sign-up',
                element: <SignUp/>
            },
        ]

    }
];

export default createBrowserRouter(routes);