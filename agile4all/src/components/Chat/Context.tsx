import { createContext, ReactNode, useCallback, useContext, useState } from "react";


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


export function ChatContextProvider({ children }: IChatContextProvider) {
    const [chatOpen, setOpen] = useState<boolean>(initState)

    const toggleChat = useCallback(() => setOpen(!chatOpen),
        [chatOpen]
    )


    return (
        <ChatContext.Provider value={{ chatOpen, toggleChat }}>
            {children}
        </ChatContext.Provider>
    )
}


export function useChatContext(): IChatContext {
    return useContext(ChatContext);
}