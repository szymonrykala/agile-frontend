import { DataModel, UUID } from "./common"
import Task from "./task"
import User from "./user"


interface Project extends DataModel {
    name: string,
    description: string,
    users: Array<User>,
}


export interface FullProject extends Project {
    files: Array<File>
    tasks: Array<Task>
}

export default Project