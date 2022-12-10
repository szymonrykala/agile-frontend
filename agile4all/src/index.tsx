import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/joy/styles';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppRouter from './AppRouter';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={AppRouter} />
    </StyledEngineProvider>
  </React.StrictMode>
);
