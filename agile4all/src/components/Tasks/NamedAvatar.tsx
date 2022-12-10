import { Avatar, Link as MUILink, Sheet, Typography } from "@mui/joy";
import Link from "../common/Link";


export default function NamedAvatar(){
    return(
        <Sheet sx={{
            display: 'flex',
            gap: 1
        }}>
            <Avatar
                alt="Assigned User"
                src='https://www.vecteezy.com/vector-art/2002427-man-avatar-character-isolated-icon'
            />
            <Sheet>
                <Typography level='body2'>
                    <Link to='/users/id_of_the_user'>
                        Assigned User
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