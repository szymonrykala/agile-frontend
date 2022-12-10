import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';


import SideNav from './components/SideNav'
import teamTheme from './theme';
import Layout from './components/Layout';
import Header from './components/Header';

import { Outlet } from 'react-router-dom';


export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange theme={teamTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />

      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <SideNav />
        </Layout.SideDrawer>
      )}

      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header setDrawerOpen={setDrawerOpen} />
        </Layout.Header>

        <Layout.SideNav>
          <SideNav />
        </Layout.SideNav>

        <Layout.Main>

          {/* 
            Here the content of router will be displayed and switched 
            - instead of <Outlet/>
          */}
          <Outlet />

        </Layout.Main>
      </Layout.Root>


    </CssVarsProvider >
  );
}