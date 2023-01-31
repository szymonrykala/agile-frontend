import { Stack } from "@mui/joy";
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router";
import { UsersApi } from "../../client";
import { useAppDispatch } from "../../hooks";
import User, { UserRole } from "../../models/user";
import { load } from "../../store/usersSlice";
import ParameterBar from "../ParameterBar";
import ParameterBarContextProvider from "../ParameterBar/Context";
import UsersList from "../Users/UsersList";


const sorts = [
    {
        name: 'Role',
        key: 'role'
    },
    {
        name: 'email',
        key: 'email'
    },
    {
        name: 'firstname',
        key: 'firstname'
    },
]

const user: User = {
    id: 1,
    email: 'example@gmail.com',
    firstname: 'Janusz',
    lastname: 'Testowski',
    role: UserRole.STUDENT,
}

const filters = [
    'id', 'email', 'firstname',
    'lastname', 'role'
]

const mockedUsers: User[] = new Array(6).fill(user)


export default function Users() {
    const dispatch = useAppDispatch();

    const loadUsers = useCallback(async () => {
        const users = await UsersApi.getAll() as User[];
        // dispatch(load(users));
        dispatch(load(mockedUsers))
    }, [dispatch])


    useEffect(() => {
        loadUsers()
    }, [loadUsers])


    return (
        <ParameterBarContextProvider<User>>
            <Stack spacing={2} >
                <ParameterBar<User> sorts={sorts} filters={filters} init={{ sort: 1, filter: filters.indexOf('email') }} />
                <Outlet />
                <UsersList />
            </Stack>
        </ParameterBarContextProvider>
    )
}