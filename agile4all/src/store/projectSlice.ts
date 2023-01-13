import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Project from '../models/project'
import { IselectBy } from './index'


export const projectSlice = createSlice({
    name: 'projects',
    initialState: [] as Project[],
    reducers: {
        add: (projects, action: PayloadAction<Project[]>) => {
            return [...projects, ...action.payload]
        },
        remove: (projects, action: PayloadAction<Project>) => {
            return projects.filter(item => item.id !== action.payload.id)
        },
        reset: (projects) => {
            return []
        },
        selectBy: (projects, action: PayloadAction<IselectBy>) => {
            const key = Object.keys(action.payload)[0]

            return projects.filter(item => item[key] === action.payload[key])
        },
    },
})

export const { add, remove, reset, selectBy } = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (projects: RootState) => projects

export default projectSlice.reducer