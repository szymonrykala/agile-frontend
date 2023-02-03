import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

const initState = false

interface IChatContext {
    toggleChat: () => void
    chatOpen: boolean
}

export const ChatContext = createContext<IChatContext>({
    chatOpen: false,
    toggleChat: () => false
});


interface IChatContextProvider {
    children: ReactNode
}

const socket = new WebSocket('ws://localhost:7232/chat');


export function ChatContextProvider({ children }: IChatContextProvider) {
    const [chatOpen, setOpen] = useState<boolean>(initState)

    const toggleChat = useCallback(() => setOpen(!chatOpen),
        [chatOpen]
    )

    useEffect(()=>{
        socket.addEventListener('open', (event) => {
            socket.send('Hello Server!');
            console.log('Połączyło się :o')

            socket.addEventListener('close', (event) => {
                socket.send('Hello Server!');
            });
        });
       
        socket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
        });

        socket.addEventListener('error', (event) => {
            console.log('Error from server ', event);
        });

        // socket.send(JSON.stringify({'takie':'oooo'}))

    },[])


    return (
        <ChatContext.Provider value={{ chatOpen, toggleChat }}>
            {children}
        </ChatContext.Provider>
    )
}


export function useChatContext(): IChatContext {
    return useContext(ChatContext);
}