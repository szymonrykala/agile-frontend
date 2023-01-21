import { Sheet, IconButton } from "@mui/joy";
import FileModel from "../../models/file";
import UploadIcon from '@mui/icons-material/Upload';
import File from './File';
import { useCallback, useMemo, useState } from "react";
import { UsersApi } from "../../client";
import { UUID } from "../../models/common";


interface IFilesPanel {
    files: FileModel[]
}

export default function FilesPanel(props: IFilesPanel) {
    const [files, setFiles] = useState<FileModel[]>(props.files)
    const userId = useMemo(() => UsersApi.getSavedUserId(), []);

    const uploadFile = useCallback(() => {
        const fileName = prompt('file name') || 'unknown';

        const newFile: FileModel = {
            id: fileName,
            name: fileName,
            link: `https://myapp.com/files/${fileName}`,
            userId: userId,
            modificationDate: new Date().toLocaleDateString()
        }

        //api call

        setFiles([...files, newFile])
    }, [files, setFiles, userId]);


    const deleteFile = useCallback((fileId: UUID) => {
        const proceed = true // needs confirmation from dialog box
        if (!proceed) return;
        //api call

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
                <IconButton
                    onClick={uploadFile}
                    variant="soft"
                    size="lg"
                >
                    <UploadIcon fontSize="large" />
                </IconButton>
            </Sheet>
        </Sheet>
    )
}