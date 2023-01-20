import MenuIcon from '@mui/icons-material/Menu';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import ColorSchemeToggle from '../SideNav/ColorSchemeToggle';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';




interface IHeader {
    setDrawerOpen?: Dispatch<SetStateAction<boolean>>
}


export default function Header(props: IHeader) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                {props.setDrawerOpen && <IconButton
                    variant="outlined"
                    size="sm"
                    onClick={() => props.setDrawerOpen && props.setDrawerOpen(true)}
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>}
                <IconButton
                    size="sm"
                    variant="solid"
                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                    <GroupRoundedIcon />
                </IconButton>
                <Typography component="h1" fontWeight="xl">
                    Agile4All
                </Typography>
            </Box>

            {/* <TextField
                size="sm"
                placeholder="Search anything…"
                startDecorator={<SearchRoundedIcon color="primary" />}
                endDecorator={
                    <IconButton variant="outlined" size="sm" color="neutral">
                        <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                            /
                        </Typography>
                    </IconButton>
                }
                sx={{
                    flexBasis: '500px',
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                }}
            /> */}

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                <ColorSchemeToggle />

                <Divider />

                <IconButton
                    size="sm"
                    variant="outlined"
                    color="danger"
                    component={Link}
                    to="/logout"
                >
                    <LogoutIcon />
                </IconButton>
            </Box>
        </>
    );
}