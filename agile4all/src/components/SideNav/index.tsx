import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';


const clicked = {
  variant: "soft",
  color: "primary"
}

const links = [
  {
    name: 'Tasks',
    link: '/users/id_of_the_user',
    Icon: HomeIcon
  }, {
    name: 'Projects',
    link: '/projects',
    Icon: AssignmentIndRoundedIcon
  }, {
    name: 'Users',
    link: '/users',
    Icon: PeopleRoundedIcon
  },{
    name: 'Chat',
    link: '/chat',
    Icon: PeopleRoundedIcon
  },
]


export default function SideNav() {
  const loc = useLocation();
  const path = useResolvedPath(loc);

  return (
    <List size="sm" sx={{ '--List-item-radius': '8px' }}>

      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            id="nav-list-browse"
            textColor="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            Menu
          </Typography>
        </Box>

        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          {
            links.map(({ link, name, Icon }) => (

              <ListItem key={name}>
                <ListItemButton
                  {...path.pathname === link ? clicked : Object()}
                  component={Link} to={link}
                >
                  <ListItemDecorator sx={{ color: 'inherit' }}>
                    <Icon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>{name}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </ListItem >
    </List >
  );
}