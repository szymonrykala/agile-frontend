import File from "./file"
import Task from "./task"
import User from "./user"


export type UUID = Required<Readonly<string>>


export interface DataModel {
    [index: string]: string | Date | Array<Task | File | User>,
    id: UUID
}

