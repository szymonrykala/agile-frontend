import { configureStore } from '@reduxjs/toolkit'
import projectSlice from './projectSlice';
import taskSlice from './taskSlice';
import usersSlice from './usersSlice';


const store = configureStore({
  reducer: {
    tasks: taskSlice,
    projects: projectSlice,
    users: usersSlice,
  },
})


export default store;


export interface IselectBy {
    [index: string]: string | number | boolean
}
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>