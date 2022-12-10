import Task, { FullTask, TaskStatus } from "../models/task";
import { uuid } from "./commons";
import { mockFile } from "./file";


function randomStatus() {
    const statuses = [
        TaskStatus.ARCHIVED,
        TaskStatus.TODO,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ]
    return statuses[Date.now() % 3]
}


export function mockTask(projectUUID = uuid()): Task {
    return {
        id: uuid(),
        title: 'Super unique name of task',
        description: 'task description which is so unique and meaningfull that You will not have any problems to successfully finish it',
        status: randomStatus(),
        userId: uuid(),
        projectId: projectUUID
    }
}


export function mockFullTask(projectUUID = uuid()): FullTask {
    return {
        id: uuid(),
        title: 'Super unique name of task',
        description: 'task description which is so unique and meaningfull that You will not have any problems to successfully finish it',
        status: randomStatus(),
        userId: uuid(),
        projectId: projectUUID,
        files: new Array(3).fill(mockFile())
    }
}