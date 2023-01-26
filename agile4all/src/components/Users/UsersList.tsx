import { List, Sheet } from '@mui/joy';
import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import User from '../../models/user';
import { useParameterBarContext } from '../ParameterBar/Context';
import UserListItem from './UserListItem';




export default function UsersList() {
    const { sort } = useParameterBarContext<User>();
    const users = useAppSelector(({ users }) => users);

    const filteredUsers = useMemo(() => {
        const localUsers = [...users];

        if (sort?.key) {
            return localUsers.sort((u1, u2) => (u1[sort.key] as any) - (u2[sort.key] as any));
        } else {
            return localUsers
        }
    }, [sort?.key, users])


    return (
        <Sheet sx={{ padding: 3, bgcolor: 'background.componentBg' }}>
            <List
                sx={{ '--List-decorator-size': '56px', gap: 1 }}
            >
                {filteredUsers.map((user, index) => <UserListItem key={index} data={user} />)}
            </List>
        </Sheet>
    )
}
