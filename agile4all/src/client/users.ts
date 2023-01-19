import { UUID } from "../models/common"
import { Session, UserRole } from "../models/user"
import ApiClient from "./ApiClient"
import { NoValidUserSessionError } from "./exceptions"


interface ICreateUserData {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: UserRole
}

interface IUpdateUserData {
    firstName: string,
    lastName: string,
    role: UserRole
}


export default class UsersClient
    extends ApiClient<ICreateUserData, IUpdateUserData> {
        private userIdKey = 'userId'

        public path:string = '/users'

        saveUserId(userId:UUID){
            localStorage.setItem(this.userIdKey,userId)
        }

        getLocalUserId(){
            
        }

        async readUserFromSession(){
            const userId = localStorage.getItem(this.userIdKey)

            if(userId === null) throw new NoValidUserSessionError()
            
            try {
                const user =  await this.getOne(userId) as Session
                return user
            } catch (error) {
                console.error(error)
                throw new NoValidUserSessionError()
            }
        }
}

