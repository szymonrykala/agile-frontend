import UsersClient from './users'
import TasksClient from './tasks'
import ProjectsClient from './projects';


export const UsersApi =  new UsersClient();
export const TasksApi =  new TasksClient();
export const ProjectsApi = new ProjectsClient();