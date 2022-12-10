import { List } from "@mui/joy";
import Link from "../common/Link";
import TaskCard from "../Tasks/TaskCard";
import CollapsibleListItem from "../common/CollapsibleListItem";
import { Outlet } from "react-router";
import { mockProject } from "../../mockData/projects";
import useTasksListLoader from "../Tasks/useTasksListLoader";
import Project from "../../models/project";



const mockedProjects = new Array(2).fill(0).map(_ => mockProject())




interface IProjectListItem {
    data: Project
}

function ProjectListItem({ data }: IProjectListItem) {
    const tasks = useTasksListLoader({
        projectId: data.id
    })

    return (
        <CollapsibleListItem
            open={true}
            header={
                <Link to={`/projects/${data.id}`}>
                    {data.name}
                </Link>
            }
        >
            {tasks.map((task, index) => <TaskCard data={task} key={index} />)}
        </CollapsibleListItem>
    )
}



export default function Tasks() {

    return (
        <>
            <Outlet />
            <List>
                {
                    mockedProjects.map((project, index) =>
                        <ProjectListItem data={project} key={index} />
                    )
                }
            </List>
        </>
    )
}