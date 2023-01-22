import { Chip } from "@mui/joy";
import { TaskStatus } from "../../models/task";

interface IStatusChip {
    status: TaskStatus
}

export function getStatusColor(status: TaskStatus) {
    switch (status) {
        case TaskStatus.DONE:
            return 'success';
        case TaskStatus.TODO:
            return 'primary';
        case TaskStatus.IN_PROGRESS:
            return 'info';
        case TaskStatus.ARCHIVED:
            return 'neutral';
        default:
            return 'primary';
    }
}


export default function StatusChip(props: IStatusChip) {
    return (
        <Chip
            component='span'
            size="sm"
            color={getStatusColor(props.status)}
        >
            {props.status}
        </Chip>
    )
}