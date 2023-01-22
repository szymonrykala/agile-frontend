import Modal from "../common/Modal";
import { Divider, IconButton, Option, Select, Sheet, Typography } from "@mui/joy";
import Task, { TaskStatus } from "../../models/task";
import { getStatusColor } from "./StatusChip";
import NamedAvatar from "./NamedAvatar";
import { useCallback, useEffect, useState } from "react";
import FilesPanel from "../FilesPanel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableTextArea from "../common/EditableTextArea";
import confirm from "../common/Confirm";
import { UUID } from "../../models/common";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TasksApi } from "../../client";
import { remove, update } from "../../store/taskSlice";
import { useParams } from "react-router";



const demoTaskData = {
    description: `loading...`,
    title: `loading...`,
    id: '001',
    projectId: '001',
    status: TaskStatus.ARCHIVED,
    userId: '001'
}


export default function TaskModal() {
    const sessionUser = useAppSelector(({ session }) => session?.user)
    const [editMode, setEditMode] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { taskId } = useParams()
    const initTask = useAppSelector(({ tasks }) => tasks.find(({ id }) => id === taskId))

    const [task, setTask] = useState<Task>(initTask || demoTaskData);

    useEffect(() => {

    }, [])

    const deleteTask = useCallback(async () => {
        const proceed = await confirm('Do You want to delete this task?')
        if (!proceed) return;

        await TasksApi.delete(task.id)
        dispatch(remove(task))
    }, [task, dispatch])

    const updateTask = useCallback(async () => {
        if (task !== initTask) {
            dispatch(update(task))
            try {
                await TasksApi.update(task.id, {
                    description: task.description,
                    title: task.title,
                    status: task.status,
                    userId: task.userId
                })
            } catch (err) { alert(err) }
        }

    }, [task, dispatch, initTask])

    const updateAssignedUser = useCallback((event: any, user: UUID | null) => {
        if (!user) return;

        setTask({ ...task, userId: user })
    }, [task])

    const statusUpdate = useCallback((event: any, newStatus: TaskStatus | null) => {
        // api call ??
        if (newStatus) setTask({ ...task, status: newStatus })
    }, [task]);


    return (
        <Modal
            title='task window'
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
                    value={task.status}
                    color={getStatusColor(task.status)}
                    variant="soft"
                    sx={{ minWidth: 120 }}
                    onChange={statusUpdate}
                >
                    <Option value={TaskStatus.DONE}>Done!</Option>
                    <Option value={TaskStatus.IN_PROGRESS}>In progress</Option>
                    <Option value={TaskStatus.TODO}>To Do</Option>
                    <Option value={TaskStatus.ARCHIVED}>archived</Option>
                </Select>
                <Sheet sx={{ display: 'flex', gap: 1, bgcolor: 'inherit' }}>
                    <IconButton onClick={() => setEditMode(!editMode)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={updateTask} color='success'>
                        <SaveIcon />
                    </IconButton>

                    <IconButton onClick={deleteTask} color='danger'>
                        <DeleteIcon />
                    </IconButton>
                </Sheet>
            </Sheet>

            <Typography component='label' level='body3'>
                Assigned user
                <Select
                    disabled={!editMode}
                    size="sm"
                    value={task.userId}
                    variant={editMode ? "soft" : 'plain'}
                    onChange={updateAssignedUser}
                >
                    {
                        [
                            {
                                id: '34656gyh67i',
                                email: 'firstOne@email.com'
                            }, {
                                id: '4365677i',
                                email: 'secondOne@email.com'
                            }, {
                                id: sessionUser?.id,
                                email: sessionUser?.email
                            }
                        ].map((user, index) =>
                            <Option key={index} value={user.id}>
                                {user.email}
                            </Option>
                        )
                    }
                </Select>
            </Typography>

            <EditableTextArea
                title="Title:"
                editable={editMode}
                value={task.title}
                onChange={(value) => setTask({ ...task, title: value })}
            />

            <EditableTextArea
                title="Description:"
                editable={editMode}
                value={task.description}
                onChange={(value) => setTask({ ...task, description: value })}
            />

            <Divider />
            <FilesPanel files={[]} />
        </Modal>
    )
}