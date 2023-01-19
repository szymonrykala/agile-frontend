import { List } from "@mui/joy";
import Link from "../common/Link";
import TaskCard from "../Tasks/TaskCard";
import CollapsibleListItem from "../common/CollapsibleListItem";
import { Outlet, useParams } from "react-router";
import { mockProject } from "../../mockData/projects";
import Project from "../../models/project";
import FilterBar from "../FilterBar";
import { useCallback, useEffect } from "react";
import { TasksApi } from '../../client';
import Task from "../../models/task";
import React from "react";
import { useAppSelector } from "../../hooks";
import { UUID } from "../../models/common";


const mockedProjects = new Array(2).fill(0).map(_ => mockProject())



interface IProjectListItem {
    project: {
        name: string,
        id: UUID
    }
}

function ProjectTasksListItem({project}: IProjectListItem) {
    const { userId } = useParams();
    const [tasks, setTasks] = React.useState<Task[]>([]);

    const getTasks = useCallback(async () => {
        try {
            const taskItems = await TasksApi.getAll({
                'userId': userId
            })
            setTasks(taskItems as Task[])

        } catch (err) {
            console.debug(err)
        }
    }, [userId])

    useEffect(() => {
        getTasks()

        return () => {
            setTasks([]);
        }
    }, [
        getTasks,
    ])


    return (
        <CollapsibleListItem
            open={true}
            header={
                <Link to={`/projects/${project.id}`}>
                    {project.name}
                </Link>
            }
        >
            {tasks.map((task, index) => <TaskCard data={task} key={index} />)}
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