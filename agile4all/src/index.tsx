import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StyledEngineProvider } from '@mui/joy/styles';
import store from './store'
import { Provider } from 'react-redux'

import {
  RouterProvider,
} from "react-router-dom";
import AppRouter from './AppRouter';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <RouterProvider router={AppRouter} />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
