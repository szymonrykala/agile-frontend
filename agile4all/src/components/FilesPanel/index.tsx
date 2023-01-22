import { Sheet, IconButton } from "@mui/joy";
import FileModel from "../../models/file";
import UploadIcon from '@mui/icons-material/Upload';
import File from './File';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FilesApi, UsersApi } from "../../client";
import { UUID } from "../../models/common";
import { QueryParams } from "../../client/interface";


interface IFilesPanel {
    files: FileModel[],
    projectId?: UUID,
    taskId?: UUID
}

export default function FilesPanel(props: IFilesPanel) {
    const [files, setFiles] = useState<FileModel[]>(props.files)
    const userId = useMemo(() => UsersApi.getSavedUserId(), []);
    const fileInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)



    const fetchFiles = useCallback(async () => {
        const params: QueryParams = {}

        if (props.projectId) params['projectId'] = props.projectId;
        if (props.taskId) params['taskId'] = props.taskId

        const resp = await FilesApi.getAll(params) as FileModel[]
        console.info(resp)
        // setFiles(resp)

    }, [props.projectId, props.taskId])

    useEffect(() => {
        fetchFiles()
    }, [fetchFiles])



    const uploadFile = useCallback(async () => {
        console.info('uploading a file')
        if (!fileInputRef?.current) return;

        const file = fileInputRef.current.files?.item(0)
        if (!file) {
            alert('problem z załadowaniem pliku');
            return;
        }

        const newFile: FileModel = {
            id: file.name,
            name: file.name,
            link: `https://myapp.com/files/${file.name}`,
            userId: userId,
            modificationDate: new Date().toLocaleDateString()
        }

        try {
            await FilesApi.uploadFile(file)
            setFiles([...files, newFile])
            fileInputRef.current.value = ''
            console.log(fileInputRef.current.files)
            fetchFiles()
        } catch (err) {
            alert(err)
        }

    }, [files, setFiles, userId, fetchFiles]);



    useEffect(() => {
        if (!fileInputRef?.current) return;
        const fileInput = fileInputRef.current

        fileInput.addEventListener('change', uploadFile)

        return () => {
            fileInput.removeEventListener('change', uploadFile)
        }
    }, [uploadFile])



    const loadFile = useCallback(() => {
        if (fileInputRef?.current) {
            console.log(fileInputRef.current)
            fileInputRef.current.click()
        }

    }, []);



    const deleteFile = useCallback(async (fileId: UUID) => {

        await FilesApi.delete(fileId)
        setFiles(files.filter(({ id }) => id !== fileId));

    }, [files, setFiles]);



    return (
        <Sheet sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'inherit',
        }}>
            {
                files.map((file, index) => <File key={index}
                    data={file}
                    onDelete={deleteFile}
                />)
            }
            <Sheet sx={{ bgcolor: 'inherit' }}>
                <input style={{ display: 'none' }} type='file' ref={fileInputRef} />
                <IconButton
                    onClick={loadFile}
                    variant="soft"
                    size="lg"
                >
                    <UploadIcon fontSize="large" />
                </IconButton>
            </Sheet>
        </Sheet>
    )
}