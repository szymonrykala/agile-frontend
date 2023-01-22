import { Card, Typography } from "@mui/joy";
import Task from "../../models/task";
import Link from "../common/Link";
import StatusChip from "./StatusChip";


interface ITaskCard {
    data: Task
}

export default function TaskCard({ data }: ITaskCard) {
    return (
        <Card sx={{
            maxWidth: 'inherit',
            bgcolor: 'background.componentBg',
        }}>
            <Typography level='body2' marginBottom={1}>
                <StatusChip status={data.status} />
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
                <Link to={`${data.id}`}>
                    {data.id.slice(-5, -1)}-
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
                to={`${data.id}`}
            >more...</Link>
        </Card>
    )
}