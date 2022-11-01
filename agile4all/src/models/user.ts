import { DataModel, UUID } from "./common"

export enum UserRole {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN'
}

interface User extends DataModel{
    email: string,
    firstname: string,
    lastname: string,
    role: UserRole
}

export default User