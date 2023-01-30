import { IconButton, List, Sheet, Typography } from "@mui/joy";
import Link from "../common/Link";
import TaskCard from "../Tasks/TaskCard";
import CollapsibleListItem from "../common/CollapsibleListItem";
import { Outlet, useParams } from "react-router";
import FilterBar from "../ParameterBar";
import { useCallback, useEffect } from "react";
import { TasksApi } from '../../client';
import Task from "../../models/task";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UUID } from "../../models/common";
import { load } from "../../store/taskSlice";
import AddIcon from "@mui/icons-material/Add";
import { ICreateTaskData } from "../../client/tasks";
import FilesPanel from "../FilesPanel";


interface IProjectListItem {
    project: {
        name: string,
        id: UUID
    }
}

function ProjectTasksListItem({ project }: IProjectListItem) {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(({ tasks }) => tasks);
    const sessionUser = useAppSelector(({ session }) => session?.user)


    const getTasks = useCallback(async () => {
        try {
            const taskItems = await TasksApi.getAll({
                'userId': Number(userId)
            })
            dispatch(load(taskItems as Task[]))

        } catch (err) {
            console.debug(err)
        }
    }, [userId, dispatch])


    const createTask = useCallback(async () => {
        const title: string = prompt('type a task title') || 'created task';

        const task: ICreateTaskData = {
            title: title,
            description: "What needs to be done??",
            userId: sessionUser?.id || -1
        }
        await TasksApi.create(task)
        getTasks()
    }, [sessionUser?.id, getTasks]);


    useEffect(() => {
        getTasks()
    }, [getTasks])


    return (
        <CollapsibleListItem
            open={true}
            header={
                <Link to={`/projects/${project.id}`}>
                    {project.name}
                </Link>
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
            {tasks.map((task, index) => <TaskCard data={task} key={index} />)}
            <IconButton
                onClick={createTask}
                size='lg'
            >
                <AddIcon />
            </IconButton>

        </CollapsibleListItem>
    )
}


export default function Tasks() {
    const projects = useAppSelector(({ session }) => session?.projects);

    return (
        <>
            <Outlet />
            <FilterBar />
            <List>
                {
                    projects && projects.map((project, index) =>
                        <ProjectTasksListItem project={project} key={index} />
                    )
                }
            </List>
        </>
    )
}