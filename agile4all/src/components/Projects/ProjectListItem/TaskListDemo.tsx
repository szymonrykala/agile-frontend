import { List, ListItem, ListItemButton, ListItemContent, Typography, Chip, Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { UUID } from "../../../models/common";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';


interface ITaskListDemo {
    projectId: UUID
}

export default function TaskListDemo(props: ITaskListDemo) {
    return (
        <>
            <List size='sm'>
                {
                    [
                        { id: 1, title: "Fix somethin very importatnt someone broke smth agn" },
                        { id: 2, title: "Implement heartbreaking feature" },
                        { id: 3, title: "Fix somethin very importatnt" },
                    ].map(({ title, id }, index) =>
                        <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                            <ListItemButton component={Link} to={`${props.projectId}/tasks/${id}`}>
                                <ListItemContent>
                                    <Typography level="body2" sx={{
                                        textOverflow: "ellipsis",
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {id}&nbsp;-&nbsp;{title}
                                    </Typography>
                                </ListItemContent>
                                <Chip
                                    variant='soft'
                                    color='primary'
                                    size='sm'
                                >
                                    in progress
                                </Chip>
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
            <Button
                size="sm"
                variant="plain"
                endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                component={Link}
                to={`${props.projectId}/tasks`}
            >
                More tasks
            </Button>
        </>
    )
}
