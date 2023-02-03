import { List, Sheet, Typography } from "@mui/joy";
import Link from "../common/Link";
import TaskCard from "../Tasks/TaskCard";
import CollapsibleListItem from "../common/CollapsibleListItem";
import { Outlet, useParams } from "react-router";
import ParameterBar from "../ParameterBar";
import { useCallback, useEffect, useMemo } from "react";
import { TasksApi } from '../../client';
import Task, { taskStatusSort } from "../../models/task";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UUID } from "../../models/common";
import { load } from "../../store/taskSlice";
import { ICreateTaskData } from "../../client/tasks";
import FilesPanel from "../FilesPanel";
import ParameterBarContextProvider, { ISortItem } from "../ParameterBar/Context";
import AddListItem from "../common/AddListItem";
import { useReloadTrigger } from "../common/ReloadTrigger";
import { QueryParams } from "../../client/interface";
import Project from "../../models/project";
import User from "../../models/user";


interface IProjectListItem {
    tasks: Task[],
    project: {
        name: string,
        id: UUID
    }
}


function TaskListItem({ project, tasks }: IProjectListItem) {
    const { reload } = useReloadTrigger()
    const sessionUser = useAppSelector(({ session }) => session?.user)


    const sortedTasks = useMemo(() => {
        return tasks.sort(taskStatusSort)
    }, [tasks])


    const createTask = useCallback(async (projectId: UUID) => {
        const title: string = prompt('type a task title') || 'created task';

        const task: ICreateTaskData = {
            title: title,
            description: "What needs to be done??",
            userId: sessionUser?.id || -1,
            projectId: projectId
        }
        await TasksApi.create(task)
        reload('tasks')
    }, [sessionUser?.id, reload]);


    return (
        <CollapsibleListItem
            open={true}
            header={
                <Typography
                    component={Link}
                    to={`/app/projects/${project.id}`}
                >
                    {project.name}
                </Typography>
            }
            footer={
                <Sheet sx={{ bgcolor: 'inherit' }}>
                    <Typography level="body2">
                        Project files:
                    </Typography>
                    <FilesPanel files={[]} />
                </Sheet>
            }
        >
            {
                sortedTasks.map((task, index) => <TaskCard data={task} key={`task-${index}`} />)
            }

            <AddListItem component='div' onClick={() => createTask(sortedTasks[0].projectId)} />
        </CollapsibleListItem>
    )
}

const filters = [
    'title', 'description'
]

const sorts: ISortItem<Task>[] = [
    {
        name: 'Project',
        key: 'projectId',
    },
    {
        name: 'Status',
        key: 'status',
    },
]


function selectProjects(projects: Project[], users: User[], queryParams: QueryParams) {
    if (queryParams?.projectId) {
        return projects.filter(({ id }) => id === queryParams.projectId)

    } else if (queryParams?.userId) {
        return projects.filter(({ users }) =>
            users.map(({ id }) => id).includes(queryParams.userId as number)
        )
    } else {
        return []
    }
}


export default function Tasks() {
    const queryParams = useParams();
    const trigger = useReloadTrigger()
    // const sessionUser = useAppSelector(({ session }) => session?.user)
    const projects = useAppSelector(({ projects, users }) =>
        selectProjects(projects, users, queryParams)
    );
    const tasks = useAppSelector(({ tasks }) => tasks);
    const dispatch = useAppDispatch();


    const getTasks = useCallback(async () => {
        try {
            const taskItems: Task[] = await TasksApi.getAll(queryParams) as unknown as Task[]
            dispatch(load(taskItems))

        } catch (err) {
            console.debug(err)
        }
    }, [queryParams, dispatch])


    useEffect(() => {
        getTasks()
    }, [getTasks, trigger.tasks])


    return (
        <ParameterBarContextProvider<Task>>
            <ParameterBar<Task> sorts={sorts} filters={filters} init={{ filter: 0, sort: 0 }} />
            <Outlet />
            <List>
                {projects?.length === 0 ?
                    <Typography p='50px 0px' textAlign='center'>
                        Create a project to see it tasks
                    </Typography>
                    :
                    projects && projects.map((project, index) =>
                        <TaskListItem tasks={tasks} project={project} key={index} />
                    )
                }
            </List>
        </ParameterBarContextProvider >
    )
}