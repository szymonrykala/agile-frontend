import { Avatar, Link as MUILink, Sheet, Typography } from "@mui/joy";
import User from "../../models/user";
import Link from "../common/Link";


interface INamedAvatar {
    user?: User
}

export default function NamedAvatar({ user }: INamedAvatar) {
    return (
        <Sheet sx={{
            display: 'flex',
            gap: 1,
            bgcolor: 'inherit'
        }}>
            <Avatar
                alt="Assigned User"
                src=''
            />
            <Sheet sx={{ bgcolor: 'inherit' }}>
                <Typography level='body2'>
                    <Link to={`/app/users/${user?.id}`}>
                        {user?.firstname}&nbps;{user?.lastname}
                    </Link>
                </Typography>
                <Typography level='body3'>
                    <MUILink href={`email:${user?.email}`}>
                        {user?.email}
                    </MUILink>
                </Typography>
            </Sheet>
        </Sheet>
    )
}