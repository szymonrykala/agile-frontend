import * as React from 'react';
import SideNav from './components/SideNav'
import Layout from './components/Layout';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';


export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
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

        {<Layout.SideNav>
          <SideNav />
        </Layout.SideNav>}

        <Layout.Main>

          {/* 
            Here the content of router will be displayed and switched 
            - instead of <Outlet/>
          */}
          <Outlet />

        </Layout.Main>
      </Layout.Root>
    </>
  );
}