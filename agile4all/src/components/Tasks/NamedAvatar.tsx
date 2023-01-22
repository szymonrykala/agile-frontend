import { Avatar, Link as MUILink, Sheet, Typography } from "@mui/joy";
import Link from "../common/Link";


export default function NamedAvatar() {
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
                    <Link to='/users/id_of_the_user'>
                        Creator User
                    </Link>
                </Typography>
                <Typography level='body3'>
                    <MUILink href='email:assigned.user@gmail.com'>
                        assigned.user@gmail.com
                    </MUILink>
                </Typography>
            </Sheet>
        </Sheet>
    )
}