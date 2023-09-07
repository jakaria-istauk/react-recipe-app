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
import Error404 from './common/404';
import Blogs from './blogs/Blogs';
import BlogDetails from './blogs/BlogDetails';
import Profile from './profile/Profile';
import ProfileEdit from './profile/ProfileEdit';

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
                        path: '/recipe/new',
                        element: <RecipeForm key="add"/>
                    },
                    {
                        path: '/recipe/edit/:id',
                        element: <RecipeForm key="edit"/>
                    },
                    {
                        path: '/profile',
                        element: <Profile/>
                    },
                    {
                        path: '/profile/Edit',
                        element: <ProfileEdit/>
                    },
                ]
            },
            {
                index: true,
                element: <Recipes/>
            },
            {
                path: '/recipe/:id',
                element: <RecipeDetails/>
            },
            {
                path: '/blogs',
                element: <Blogs/>
            },
            {
                path: '/blog/:id',
                element: <BlogDetails/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/sign-up',
                element: <SignUp/>
            },
            {
                path: '*',
                element: <Error404/>
            },
        ]

    }
];

export default createBrowserRouter(routes);