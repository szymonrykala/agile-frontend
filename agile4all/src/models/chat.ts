import { UUID } from "./common";



export interface ChatMessage {
    text: string,
    date: string,
    userId: UUID,
    sender: string
}