import { useEffect, useState } from "react"
import { mockTask } from "../../mockData/task"
import { UUID } from "../../models/common"
import Task from "../../models/task"


interface ITasksListLoader {
    projectId?: UUID,
    userId?: UUID,
    search?: string,
    taskId?: UUID
}



export default function useTasksListLoader(props: ITasksListLoader) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const mockedTasks = new Array(8).fill(0).map(_ => mockTask(props.projectId));
        setTasks(mockedTasks);

    }, [props.projectId]);

    return tasks
}