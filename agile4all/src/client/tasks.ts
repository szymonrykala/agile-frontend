import { UserRole } from "../models/user"
import ApiClient from "./ApiClient"


interface ICreateTaskData {
    name: string,
    description: string,
    status: string,
    userI: string,
    role: UserRole
}

interface IUpdateTaskData {
    firstName: string,
    lastName: string,
    role: UserRole
}



export default class TasksClient
    extends ApiClient<ICreateTaskData, IUpdateTaskData> {

    public path: string = '/tasks'

}