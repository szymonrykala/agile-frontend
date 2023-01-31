import { List, Select, Option, ListItem, ListItemContent, IconButton, Typography, Stack, Avatar, ListItemDecorator } from "@mui/joy";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { ProjectsApi } from "../../client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UUID } from "../../models/common";
import User from "../../models/user";
import EditableTextField from "../common/EditableTextField";
import DeleteIcon from '@mui/icons-material/Delete';
import { assignUser, removeUser } from "../../store/projectSlice";


interface IProjectUsersList {
    projectId: UUID,
    users: User[]
}

interface IUserItem {
    onRemove(): void
    children: ReactNode
}

function UserItem({ children, onRemove }: IUserItem) {
    return (
        <ListItem sx={{ bgcolor: "background.componentBg" }}>
            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar src="/static/images/avatar/1.jpg" />
            </ListItemDecorator>&nbsp;&nbsp;&nbsp;
            <ListItemContent>
                <Stack direction={'row'} sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography>
                        {children}
                    </Typography>
                    <IconButton color="danger" onClick={onRemove}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </ListItemContent>
        </ListItem>
    )
}


export default function ProjectUsersList({ projectId, users }: IProjectUsersList) {
    const [localUsers, setLocalUsers] = useState<User[]>(users)

    const projectUsersIds = useMemo(() => localUsers.map(({ id }) => id), [localUsers]);

    const allUsers = useAppSelector(({ users }) => users.filter(user =>
        !projectUsersIds.includes(user.id)
    ))

    const dispatch = useAppDispatch()

    const [search, setSearch] = useState<string>('');

    const filteredAllUsers = useMemo(() => {
        if (search !== '') {
            return allUsers.filter(({ email }) => email.match(search))
        }
        return allUsers
    }, [search, allUsers])


    const addUserToProject = useCallback((user: User) => {

        ProjectsApi.addUser(projectId, user.id)
        dispatch(assignUser({ projectId: projectId, user: user }))
        setLocalUsers([...localUsers, user])
    }, [
        localUsers,
        dispatch,
        setLocalUsers,
        projectId
    ]);

    const removeProjectUser = useCallback(async (id: UUID) => {
        await ProjectsApi.removeUser(projectId, id)

        dispatch(removeUser({ projectId: projectId, userId: id }))
        
        const index = localUsers.findIndex((user) => user.id !== id);
        console.log(index)
        localUsers.splice(index, 1);
        setLocalUsers([...localUsers]);
    }, [
        projectId,
        localUsers,
        setLocalUsers,
        dispatch
    ])

    return (
        <>
            <Typography level='body3'>
                Assigned users:
            </Typography>
            <List size="sm" sx={{
                maxHeight: '200px',
                overflowY: 'scroll',
                bgcolor: "background.appBody",
                "--List-gap": '5px',
                "--List-padding": "5px"
            }}>
                {
                    localUsers.length > 0 ?
                        localUsers.map((user, index) =>
                            <UserItem
                                key={index}
                                onRemove={() => removeProjectUser(user.id)}
                            >
                                {user.email}
                            </UserItem>
                        )
                        : <Typography component='li'>
                            No users assigned
                        </Typography>
                }
            </List>
            <EditableTextField
                title="filter users"
                editable
                value={search}
                onChange={setSearch}
            />
            <Select
                value={filteredAllUsers[0]?.id}
            >
                {
                    filteredAllUsers.map((user, index) =>
                        <Option
                            key={`-${index}`}
                            value={user.id}
                            onClick={() => addUserToProject(user)}
                        >
                            {user.email}
                        </Option>
                    )
                }
            </Select>
        </>
    )
}