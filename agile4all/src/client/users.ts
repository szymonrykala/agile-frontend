import { UUID } from "../models/common"
import { Session, UserRole } from "../models/user"
import ApiClient from "./ApiClient"
import { BadCredentialsError, NoValidUserSessionError, UserRegistrationError } from "./exceptions"


export interface ILoginData {
    email: string,
    password: string
}

export interface ICreateUserData extends ILoginData{
    firstname: string,
    lastname: string,
}

export interface IUpdateUserData {
    firstName: string,
    lastName: string,
    role: UserRole
}

interface ILoginResponse{
    token: string,
    userId: UUID
}


export default class UsersClient
    extends ApiClient<ICreateUserData, IUpdateUserData> {
        private userIdKey = 'userId'

        public path:string = '/users'

        saveUserId(userId:UUID){
            localStorage.setItem(this.userIdKey,userId)
        }

        getSavedUserId(){
            localStorage.getItem(this.userIdKey)
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

        async login(data: ILoginData){
            try {
                const resp = await this._post('/auth',data) as ILoginResponse;
    
                this.authToken = resp.token
                this.saveUserId(resp.userId)
                return true
            } catch (error) {
                console.debug(error)
                if(true){
                    throw new BadCredentialsError()
                }
            }
        }

        logout(){
            this.clearAuthToken()
            localStorage.removeItem(this.userIdKey)
        }

        async register(data: ICreateUserData){
            try{
                await this._post('/users', data)
            } catch (error) {
                console.debug(error)
                if(true){
                    throw new UserRegistrationError()
                }
            }
        }
}

