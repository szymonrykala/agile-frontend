import {
  createBrowserRouter, Outlet
} from "react-router-dom";
import App from "./App";
import Projects from "./components/Pages/Projects";
import Users from "./components/Pages/Users";
import Tasks from "./components/Pages/Tasks";
import TaskModal from "./components/Tasks/TaskModal";
import Login from "./components/Pages/Login";
import Registration from "./components/Pages/Registration";
import SessionController from "./components/Pages/SessionControler";
import Logout from "./components/Pages/Logout";
import UserModal from "./components/Users/UserModal";
import { ErrorBaner } from "./components/Errors";
import ProjectModal from "./components/Projects/ProjectModal";



const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <SessionController element={<Outlet />} />,
    errorElement: null,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'register',
        element: <Registration />
      },
      {
        path: 'app',
        element: <SessionController element={<App />} />,
        children: [
          {
            path: 'users/:userId/tasks',
            element: <Tasks />,
            children: [
              {
                path: ':taskId',
                element: <TaskModal />
              }
            ]
          },
          {
            path: 'users',
            element: <Users />,
            children: [
              {
                errorElement: <ErrorBaner />,
                path: ':userId',
                element: <UserModal />,
              }
            ]
          },
          {
            path: 'projects',
            element: <Projects />,
            children: [
              {
                errorElement: <ErrorBaner />,
                path: ':projectId',
                element: <ProjectModal />,
                children: [
                  {
                    path: 'tasks',
                    element: <>project tasks</>,
                    children: [
                      {
                        path: ':taskId',
                        element: <TaskModal />,
                        errorElement: <ErrorBaner />,
                      }
                    ]
                  },
                ]
              }
            ]
          }
        ]
      },
    ]
  },
], {
  basename: process.env.REACT_APP_BASE_URL
});

export default AppRouter;