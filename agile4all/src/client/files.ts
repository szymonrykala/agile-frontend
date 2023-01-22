import { UUID } from "../models/common"
import { TaskStatus } from "../models/task"
import ApiClient from "./ApiClient"


export interface ICreateFileData {
    title: string,
    description: string,
    userId: UUID,
}

export interface IUpdateFileData {
    title: string,
    description: string,
    userId: string,
    status: TaskStatus
}



export default class FilesClient extends ApiClient<{}, {}> {

    public path: string = '/files'

    async uploadFile(file: File, projectId: UUID | null = null, taskId: UUID | null = null) {
        const resp = await fetch(
            this.BASE_URL + this.path,
            {
                method: "POST",
                cache: 'no-cache',
                mode: 'cors',
                body: file,
                headers: {
                    'Authorization': this.authToken,
                }
            }
        );

        // const data = await resp.json() as ResponseData;

        if (!resp.ok) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(resp);
            }
            throw new Error(JSON.stringify(resp));
        }
    }
}