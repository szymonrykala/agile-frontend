import { Delete, Edit, LinkRounded, Save } from "@mui/icons-material";
import { Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemContent, Option, Select, Sheet, Stack, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UsersApi } from "../../client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import User, { UserRole } from "../../models/user";
import { remove, update } from "../../store/usersSlice";
import EditableTextField from "../common/EditableTextField";
import Modal from "../common/Modal";
import NamedAvatar from "../Tasks/NamedAvatar";


const mockUSerProjects = [
    {
        name: 'SuperTurbo project',
        id: '235687iujht'
    }, {
        name: 'Kolorowe kredki',
        id: '23sdfkshf983t'
    }
]

const demoUser: User = {
    id: 'loading...',
    email: 'loading...',
    firstname: 'loading...',
    lastname: 'loading...',
    role: UserRole.STUDENT,
}


export default function UserModal() {
    const navigate = useNavigate();
    const { userId } = useParams();

    const dispatch = useAppDispatch();
    const reduxUser = useAppSelector(({ users }) => users.find(({ id }) => id === userId)) || demoUser

    const [user, setUser] = useState(reduxUser);
    const [editMode, setEditMode] = useState<boolean>(false);


    useEffect(() => {
        if (reduxUser === undefined) {
            throw Error(`User with id="${userId}" Not Found`)
        }
    }, [reduxUser]);


    const updateUserField = useCallback((
        field: string,
        value: string
    ) => {
        setUser({ ...user, [field]: value })

    }, [user])

    const roleUpdate = useCallback((event: any, newRole: UserRole | null) => {
        if (newRole) setUser({ ...user, role: newRole })
    }, [user, setUser]);


    const saveUser = useCallback(async () => {
        await UsersApi.update(user.id, {
            firstName: user.firstname,
            lastName: user.lastname,
            role: user.role
        })
        dispatch(update(user))
    }, [user, dispatch]);


    const deleteUser = useCallback(async () => {
        await UsersApi.delete(user.id);
        dispatch(remove(user));
        navigate('../')
    }, [user.id]);


    return (
        <Modal
            title='user window'
            description='detailed task window'
            sx={{
                width: '500px',
                bgcolor: 'background.componentBg',
            }}
        >
            <NamedAvatar />
            <Sheet
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    bgcolor: 'inherit',
                    justifyContent: 'space-between'
                }}>

                <Select
                    size="sm"
                    value={user.role}
                    color='neutral'
                    variant="soft"
                    sx={{ minWidth: 120 }}
                    onChange={roleUpdate}
                    disabled={!editMode}
                >
                    <Option value={UserRole.STUDENT}>Student</Option>
                    <Option value={UserRole.ADMIN}>Lecturer</Option>
                </Select>
                <Stack
                    direction='row'
                    spacing={1}
                    sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}
                >
                    <Button
                        size="sm"
                        variant="soft"
                        component={Link}
                        to="tasks"
                    >
                        Tasks
                    </Button>
                    <IconButton
                        onClick={() => setEditMode(!editMode)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton color='success' onClick={saveUser}>
                        <Save />
                    </IconButton>
                    <IconButton color='danger' onClick={deleteUser}>
                        <Delete />
                    </IconButton>
                </Stack>
            </Sheet>

            <Divider />
            <Stack direction='row' spacing={1}>
                <EditableTextField
                    title='Firstname'
                    value={user.firstname}
                    editable={editMode}
                    onChange={(text) => updateUserField('firstname', text)}
                />
                <EditableTextField
                    title='Lastname'
                    value={user.lastname}
                    editable={editMode}
                    onChange={(text) => updateUserField('lastname', text)}
                />
            </Stack>

            <Typography level="body2">
                Projects:
            </Typography>
            <List>
                {
                    mockUSerProjects.map((project, index) =>
                        < ListItem key={index}>
                            <ListItemButton component={Link} to={`/app/projects/${project.id}`}>
                                <ListItemContent>
                                    <Typography>
                                        {project.name}
                                    </Typography>
                                </ListItemContent>
                                <LinkRounded />
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </Modal >
    )
}
