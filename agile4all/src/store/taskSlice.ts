import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../models/task'
import { IselectBy } from './index'



export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
        add: (tasks, action: PayloadAction<Task[]>) => {
            return [...tasks, ...action.payload]
        },
        remove: (tasks, action: PayloadAction<Task>) => {
            return tasks.filter(item => item.id !== action.payload.id)
        },
        reset: (tasks) => {
            return []
        },
        selectBy: (tasks, action: PayloadAction<IselectBy>) => {
            const key = Object.keys(action.payload)[0]

            return tasks.filter(item => item[key] === action.payload[key])
        },
    },
})

export const { add, remove, reset, selectBy } = tasksSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (tasks: RootState) => tasks

export default tasksSlice.reducer