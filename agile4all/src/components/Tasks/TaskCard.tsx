import { Card, Typography } from "@mui/joy";
import { useAppSelector } from "../../hooks";
import Project from "../../models/project";
import Task from "../../models/task";
import User from "../../models/user";
import Link from "../common/Link";
import StatusChip from "./StatusChip";


interface ITaskCard {
    task: Task
}


function selectUserOfTask(projects: Project[], task: Task): User | undefined {
    const project = projects.find(({ id }) => id === task.projectId)
    return project?.users.find(({ id }) => id === task.userId)
}

export default function TaskCard({ task }: ITaskCard) {
    const user = useAppSelector(({ projects }) => selectUserOfTask(projects, task))

    return (
        <Card sx={{
            maxWidth: 'inherit',
            bgcolor: 'background.componentBg',
        }}>
            <Typography level='body2' marginBottom={1}>
                <StatusChip status={task.status} />
                &nbsp;
                <Link to={`/app/users/${task.userId}`}>
                    {`${user?.firstName} ${user?.lastName}`}
                </Link>
            </Typography>

            <Typography
                level='body2'
                textOverflow='ellipsis'
                overflow='hidden'
                whiteSpace='nowrap'
                maxWidth='250px'
                marginBottom={1}
            >
                <Link to={`${task.id}`}>
                    {task.id}-
                </Link>
                {task.name}
            </Typography>

            <Typography
                level='body2'
                textOverflow='ellipsis'
                overflow='hidden'
                maxHeight='110px'
            >
                {task.description}
            </Typography>
            <Link to={`${task.id}`}>see more...</Link>
        </Card>
    )
}