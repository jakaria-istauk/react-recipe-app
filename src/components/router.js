import React from 'react'
import General from './layouts/General';
import { createBrowserRouter } from 'react-router-dom';

export const routes = [
    {
        path: '/',
        exact: true,
        element: <General/>,
        name: 'Home',

    }
];

export default createBrowserRouter(routes);