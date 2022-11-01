import { DataModel, UUID } from "./common"
import File from "./file"


export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    ARCHIVED = 'ARCHIVED'
}


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