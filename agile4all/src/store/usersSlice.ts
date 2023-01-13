import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IselectBy } from './index'
import User from '../models/user'



export const usersSlice = createSlice({
    name: 'users',
    initialState: [] as User[],
    reducers: {
        add: (users, action: PayloadAction<User[]>) => {
            return [...users, ...action.payload]
        },
        remove: (users, action: PayloadAction<User>) => {
            return users.filter(item => item.id !== action.payload.id)
        },
        reset: (users) => {
            return []
        },
        selectBy: (users, action: PayloadAction<IselectBy>) => {
            const key = Object.keys(action.payload)[0]

            return users.filter(item => item[key] === action.payload[key])
        },
    },
})

export const { add, remove, reset, selectBy } = usersSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (users: RootState) => users

export default usersSlice.reducer