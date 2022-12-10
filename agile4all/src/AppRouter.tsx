import {
  createBrowserRouter
} from "react-router-dom";
import App from "./App";
import Projects from "./components/Pages/Projects";
import Users from "./components/Pages/Users";
import Tasks from "./components/Pages/Tasks";
import TaskModal from "./components/Tasks/TaskModal";



const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: null,
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
]);

export default AppRouter;