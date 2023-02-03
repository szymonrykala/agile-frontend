import { DataModel, UUID } from "./common"
import File from "./file"


export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    ARCHIVED = 'ARCHIVED'
}

export function taskStatusSort(ts1: Task, ts2: Task): number {
    switch (ts1.status) {
        case TaskStatus.TODO:
            return -2
        case TaskStatus.IN_PROGRESS:
            return -1
        case TaskStatus.DONE:
            return 0
        case TaskStatus.ARCHIVED:
        default:
            return 1
    }
}

// let arr = [TaskStatus.DONE, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.ARCHIVED]
// console.log(arr)
// arr = arr.sort(taskStatusSort)

// console.log(arr)
// arr.forEach(e=>console.log(e))



interface Task extends DataModel {
    title: string,
    description: string,
    status: Required<TaskStatus>,
    userId: UUID,
    projectId: UUID
}

export interface FullTask extends Task {
    files: Array<File>
}

export default Task