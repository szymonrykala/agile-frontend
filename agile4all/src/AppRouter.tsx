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
        path: 'registration',
        element: <Registration />
      },
      {
        path: '',
        element: <App />,
        children: [
          {
            path: 'users/:userId',
            element: <Tasks />,
            children: [
              {
                path: 'tasks/:taskid',
                element: <TaskModal />
              }
            ]
          },
          {
            path: 'users',
            element: <Users />
          },
          {
            path: 'projects',
            element: <Projects />
          }

        ]
      },
    ]
  },
]);

export default AppRouter;