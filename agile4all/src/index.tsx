import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider, StyledEngineProvider } from '@mui/joy/styles';
import store from './store'
import { Provider } from 'react-redux'
import teamTheme from './theme';
import { GlobalStyles } from '@mui/system';
import type { Theme } from '@mui/joy/styles';
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
        <CssVarsProvider disableTransitionOnChange theme={teamTheme}>
          <GlobalStyles<Theme>
            styles={(theme) => ({
              body: {
                margin: 0,
                fontFamily: theme.vars.fontFamily.body,
              },
            })}
          />
          <RouterProvider router={AppRouter} />
        </CssVarsProvider >
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
