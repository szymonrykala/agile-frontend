import { Box, Avatar, Typography, IconButton, Sheet, Button } from "@mui/joy";
import { Link, useParams } from "react-router-dom";
import Modal from "../common/Modal";
import FilesPanel from "../FilesPanel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useState } from "react";
import EditableTextField from "../common/EditableTextField";
import EditableTextArea from "../common/EditableTextArea";
import Project from "../../models/project";
import ProjectUsersList from "./ProjectUsersList";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ProjectsApi } from "../../client";
import { remove, update } from "../../store/projectSlice";



const demoProject: Project = {
    id: -1,
    name: 'loading...',
    description: 'loading...',
    files: [],
    users: []
}


export default function ProjectModal() {
    const { projectId } = useParams();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState<boolean>(false);

    const reduxProject: Project = useAppSelector(({ projects }) =>
        projects.find(({ id }) => id === Number(projectId)
        )) || demoProject;

    const [project, setProject] = useState<Project>(reduxProject)


    const saveProject = useCallback(async () => {
        await ProjectsApi.update(project.id, {
            name: project.name,
            description: project.description
        })
        dispatch(update(project))
    }, [project, dispatch])

    const deleteProject = useCallback(async () => {
        await ProjectsApi.delete(project.id)
        dispatch(remove(project))
    }, [project, dispatch])

    useEffect(() => {
        if (reduxProject.id === -1) {
            throw Error(`Project with id="${projectId}" not Found`)
        }
    }, [reduxProject.id, projectId]);


    return (
        <Modal
            title='user window'
            description='detailed task window'
            sx={{
                width: '500px',
                bgcolor: 'background.componentBg',
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                    title={project.name}
                    src="https://th.bing.com/th/id/R.75f9b714fb48bdf6c7c758dbc7f391e6?rik=BNp%2bziTPLYnx3g&pid=ImgRaw&r=0"
                    sx={{ borderRadius: 'sm' }}
                />
                <Typography>
                    <Link to={String(project.id)}>
                        {project.name}
                    </Link>
                </Typography>
            </Box>

            <Sheet sx={{ display: 'flex', gap: 1, bgcolor: 'inherit', justifyContent: 'flex-end' }}>
                <Button
                    size='sm'
                    variant="soft"
                    component={Link}
                    to={'tasks'}
                >
                    Show tasks
                </Button>
                <IconButton onClick={() => setEditMode(!editMode)}>
                    <EditIcon />
                </IconButton>

                <IconButton onClick={saveProject} color='success'>
                    <SaveIcon />
                </IconButton>

                <IconButton onClick={deleteProject} color='danger'>
                    <DeleteIcon />
                </IconButton>
            </Sheet>

            <EditableTextField
                title='Project name'
                value={project.name}
                editable={editMode}
                onChange={(text) => setProject({ ...project, name: text })}
                size='md'
            />

            <EditableTextArea
                title="Description:"
                editable={editMode}
                value={project.description}
                onChange={(value) => setProject({ ...project, description: value })}
            />

            <ProjectUsersList projectId={Number(projectId)} users={project.users} />

            <FilesPanel files={[]} />
        </Modal>
    )
}
