import { Card, Modal as JoyModal, ModalClose } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IModal {
    title: string,
    description: string,
    children: ReactNode,
    sx?: SxProps
}

export default function Modal(props: IModal) {
    const navigate = useNavigate();

    return (
        <JoyModal
            aria-labelledby={props.title}
            aria-describedby={props.description}
            open={true}
            onClose={() => navigate('../')}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}
        >
            <Card sx={{
                transform: 'translateY(-15%)',
                maxWidth: '90vw',
                maxHeight: '90vh',
                gap: 2,
                ...props.sx,
            }}>
                <ModalClose variant="soft" sx={{ zIndex: 2000 }} />

                {props.children}
            </Card>
        </JoyModal>
    )
}