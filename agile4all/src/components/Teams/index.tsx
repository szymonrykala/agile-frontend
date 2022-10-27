import List from '@mui/joy/List';
import React from 'react';
import TeamItem from './TeamItem';



export default function Teams() {
    return (
        <List
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
            }}
        >
            {[...Array(3)].map((_, index) => <TeamItem index={index as React.Key} />)}
        </List>
    )
}
