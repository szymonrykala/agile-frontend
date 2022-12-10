import { Card, Typography } from "@mui/joy";
import Task, { TaskStatus } from "../../models/task";
import Link from "../common/Link";
import StatusChip from "./StatusChip";


interface ITaskCard {
    data: Task
}

export default function TaskCard({ data }: ITaskCard) {
    return (
        <Card sx={{
            maxWidth: 'inherit'
        }}>
            <Typography level='body2' marginBottom={1}>
                <StatusChip status={TaskStatus.TODO} />
                &nbsp;
                <Link to={`/users/${data.userId}`}>
                    Assigned User
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
                <Link to={`/users/${data.userId}/tasks/${data.id}`}>
                    {data.id.slice(-5,-1)}-
                </Link>
                {data.title}
            </Typography>

            <Typography
                level='body2'
                textOverflow='ellipsis'
                overflow='hidden'
                maxHeight='110px'
            >
                {data.description}
            </Typography>
            <Link sx={{ fontSize: '0.9rem' }}
                to={`/users/${data.userId}/tasks/${data.id}`}
            >more...</Link>
        </Card>
    )
}