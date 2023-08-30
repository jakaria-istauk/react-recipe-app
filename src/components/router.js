import React from 'react'
import General from './layouts/General';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedContent from './layouts/ProtectedContent';
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';

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
                        element: <div>Hello</div>
                    }
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