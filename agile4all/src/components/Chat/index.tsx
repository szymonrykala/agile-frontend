import { Typography } from "@mui/joy";
import { useEffect, useMemo } from "react";
import { UsersApi } from "../../client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { load } from "../../store/chatSlice";
import ChatContainer from "./ChatContainer";
import Message from "./Message";


function Chat() {
    const messages = useAppSelector(({ chat }) => chat);
    const userId = useMemo(() => UsersApi.getSavedUserId(), []);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const message = {
            text: 'spoko ale wymaga bardzo dużo pracy a ciężko się na długo najeść',
            userId: '3fasdwer63f66afa6',
            date: '12:55:40 AM',
            sender: 'user@example.com'
        }
        dispatch(load([message]))
        // fetching messages at start
    }, [dispatch]);

    return (
        <ChatContainer>
            {messages.length === 0 ?
                <Typography textAlign='center' level='body2'>
                    No messages ...
                </Typography> :
                <>
                    {
                        messages.map((message, index) =>
                            <Message {...message}
                                mine={userId === message.userId}
                                key={index}
                            />
                        )
                    }
                </>
            }
        </ChatContainer>
    );
}

export default Chat;