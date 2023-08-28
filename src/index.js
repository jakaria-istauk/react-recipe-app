import React from 'react';
import { createRoot } from 'react-dom/client';

// import './app.css';
import Recipe from './components/Recipe';


const root = createRoot( document.getElementById('root') );
root.render(<Recipe/>);
