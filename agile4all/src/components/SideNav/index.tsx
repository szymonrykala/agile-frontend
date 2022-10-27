import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';




export default function SideNav() {
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
            <ListItem>
              <ListItemButton variant="soft" color="primary">
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <HomeIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Home</ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <PeopleRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Teams</ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                  <AssignmentIndRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Students</ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                  <AssignmentIndRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Tasks</ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                  <ArticleRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Policies</ListItemContent>
              </ListItemButton>
            </ListItem>

          </List>
        </ListItem>
      </List>
    );
  }