import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './components/MainApp';
import  './recipe.css';

const root = createRoot( document.getElementById('root') );
root.render(<MainApp/>);
