import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import ListItemButton from '@mui/joy/ListItemButton';
import Tooltip from '@mui/joy/Tooltip'
import Chip from '@mui/joy/Chip'
import Link from '@mui/joy/Link'


// Icons import
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';



interface ITeamItem {
    index: React.Key
}

const data = {
    name: "Team X",
    description: "Best team in the world"
}


export default function TeamItem(props: ITeamItem) {

    return (
        <Sheet
            key={props.index}
            component="li"
            variant="outlined"
            sx={{
                bgcolor: 'background.componentBg',
                borderRadius: 'sm',
                p: 2,
                listStyle: 'none',
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                    title={data.name}
                    // src="https://i.pravatar.cc/40?img=6"
                    // srcSet="https://i.pravatar.cc/80?img=6 2x"
                    sx={{ borderRadius: 'sm' }}
                />
                <Box>
                    <Typography>
                        <Link href='#team-tab'>
                            {data.name}
                        </Link>
                    </Typography>
                    <Typography level="body3">{data.description}</Typography>
                </Box>
            </Box>

            <ListDivider component="div" sx={{ my: 2 }} />


            <List>
                {
                    [
                        { id: "a4a-34", title: "Fix somethin very importatnt someone broke smth agn" },
                        { id: "a4a-32", title: "Implement heartbreaking feature" },
                        { id: "a4a-34", title: "Fix somethin very importatnt" },
                    ].map(({ title, id }) =>
                        <ListItem key={id} sx={{ alignItems: 'flex-start' }}>
                            <ListItemContent>
                                <Typography level="body2" sx={{
                                    textOverflow: "ellipsis",
                                    overflow: 'hidden',
                                    // maxHeight: 40,
                                    whiteSpace: 'nowrap'
                                }}>
                                    <Link href="#task-modal">{id}-</Link>
                                    {title}
                                </Typography>
                            </ListItemContent>
                            <Chip
                                variant='soft'
                                color='primary'
                                size='sm'
                            >
                                in progress
                            </Chip>
                        </ListItem>
                    )
                }

            </List>

            <Button
                size="sm"
                variant="plain"
                endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                component='a'
                href="#tasks-of-the-team"
            >
                More
            </Button>

            <ListDivider component="div" sx={{ my: 2 }} />

            <Typography fontSize="sm">Members:</Typography>

            <List sx={{ flexDirection: 'row' }}>
                {
                    ["Dawid Dojczman", "Filip Nowicki", "Szymon Rykała"].map((user, id) =>
                        <ListItem key={id} sx={{ alignItems: 'flex-start' }}>
                            <Tooltip title={user}>
                                <ListItemButton component='a' href='#action'>
                                    <Avatar
                                        size="sm"
                                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    )
                }
            </List>

        </Sheet>
    )
}