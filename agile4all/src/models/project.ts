import { DataModel, UUID } from "./common"
import File from "./file"
import User from "./user"


interface Project extends DataModel {
    name: string,
    description: string,
    users: Array<User>,
    files: Array<File>
}


export default Project