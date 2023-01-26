import { Avatar, Link, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import User from '../../models/user';
import { Link as RouterLink } from 'react-router-dom';



interface IUserListItem {
    data: User
}

export default function UserListItem({ data }: IUserListItem) {



    return (
        <ListItem>
            <ListItemButton component={RouterLink} to={`${data.id}`}>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                    <Avatar src="/static/images/avatar/1.jpg" />
                </ListItemDecorator>
                <ListItemContent>
                    <Typography>{data.firstname} {data.lastname}</Typography>
                    <Typography level="body2" noWrap>
                        {data.role}&nbsp;|&nbsp;{data.email}
                    </Typography>
                </ListItemContent>
            </ListItemButton>
        </ListItem>

    )
}