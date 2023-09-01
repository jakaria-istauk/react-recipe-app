import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './components/MainApp';


const root = createRoot( document.getElementById('root') );
root.render(<MainApp/>);
