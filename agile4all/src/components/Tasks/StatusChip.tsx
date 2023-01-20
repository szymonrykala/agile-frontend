import { Chip } from "@mui/joy";
import { TaskStatus} from "../../models/task";

interface IStatusChip {
    status: TaskStatus
}

const statusesMap = {
    [TaskStatus.TODO]: 'primary',
    [TaskStatus.IN_PROGRESS]: 'info',
    [TaskStatus.DONE]: 'success',
    [TaskStatus.ARCHIVED]: 'neutral',
}

export default function StatusChip(props: IStatusChip) {
    return (
        <Chip
            component='span'
            size="sm"
            color={statusesMap[props.status] as any}
        >
            {props.status}
        </Chip>
    )
}