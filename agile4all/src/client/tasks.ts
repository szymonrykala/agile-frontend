import { UUID } from "../models/common"
import { TaskStatus } from "../models/task"
import ApiClient from "./ApiClient"


export interface ICreateTaskData {
    title: string,
    description: string,
    userId: UUID,
}

export interface IUpdateTaskData {
    title: string,
    description: string,
    userId: UUID,
    status: TaskStatus
}



export default class TasksClient
    extends ApiClient<ICreateTaskData, IUpdateTaskData> {

    public path: string = '/tasks'

}