import { Stack } from "@mui/joy";
import { Outlet } from "react-router";
import ParameterBarContextProvider, { ISortItem } from "../ParameterBar/Context";
import Project from "../../models/project";
import ParameterBar from "../ParameterBar";
import ProjectsList from "../Projects/ProjectsList";
import { useCallback, useEffect } from "react";
import { ProjectsApi } from "../../client";
import { useAppDispatch } from "../../hooks";
import { load } from "../../store/projectSlice";
import { mockProject } from "../../mockData/projects";


const mockedProjects = new Array(4).fill(mockProject());


const sorts: ISortItem<Project>[] = [
    {
        name: 'Project name',
        key: 'name'
    }
]

export default function Projects() {
    const dispatch = useAppDispatch()

    const loadProjects = useCallback(async () => {
        const projects = await ProjectsApi.getAll()
        dispatch(load(mockedProjects))
    }, [dispatch])

    useEffect(() => {
        loadProjects()
    }, [loadProjects])

    return (
        <ParameterBarContextProvider<Project>>
            <Stack spacing={2} >
                <ParameterBar<Project> sorts={sorts} init={{ sort: 0 }} />
                <Outlet />
                <ProjectsList />
            </Stack>

        </ParameterBarContextProvider>
    )
}
