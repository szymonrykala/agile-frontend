import SendIcon from '@mui/icons-material/Send';
import { IconButton, Sheet, Textarea } from "@mui/joy";
import { FormEventHandler, RefObject, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChatMessage } from '../../models/chat';
import { add, leaveMessages } from '../../store/chatSlice';


interface ITextBox {
    messagesContainer?: RefObject<HTMLDivElement>
}


export default function TextBox({ messagesContainer }: ITextBox) {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('');
    const user = useAppSelector(({ session }) => session?.user)

    const submitMessage: FormEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault();

        const message: ChatMessage = {
            text: text,
            userId: user?.id || -1,
            date: new Date().toLocaleTimeString(),
            sender: user?.email || 'unknown'
        }
        if (text.length > 0) {
            dispatch(add(message));
            dispatch(leaveMessages(50))
            setText('');
        }

        // timeout - we need to wait for the message to be appended in to the list 
        // so the container can recalculate its height
        setTimeout(() => messagesContainer?.current?.scrollTo(0, 9999999), 300)

    }, [text, user, dispatch, messagesContainer]);

    return (
        <Sheet
            onSubmit={submitMessage}
            component={'form'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'inherit',
                gap: 1,
            }}>

            <Textarea
                color="neutral"
                minRows={2}
                maxRows={2}
                placeholder="Type message ..."
                size="md"
                variant="soft"
                value={text}
                onChange={({ target }) => setText(target.value)}
                sx={{
                    width: '-webkit-fill-available',
                }}
            />

            <IconButton
                type='submit'
                sx={{ justifySelf: 'flex-end' }}
            >
                <SendIcon />
            </IconButton>
        </Sheet>
    )
}