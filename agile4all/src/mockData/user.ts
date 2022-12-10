import User, { UserRole } from "../models/user";
import { uuid } from "./commons";


export function mockUser():User{
    return {
        id: uuid(),
        email: 'random.email@agile4all.com',
        firstname: 'Janusz',
        lastname: 'Kowalski',
        role: UserRole.STUDENT
    }
}

export function mockUserAdmin():User{
    return {
        id: uuid(),
        email: 'admin.email@agile4all.com',
        firstname: 'Michał',
        lastname: 'Adminowski',
        role: UserRole.ADMIN
    }
}

