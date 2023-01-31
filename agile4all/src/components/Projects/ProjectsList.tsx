import { List } from '@mui/joy';
import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import Project from '../../models/project';
import { useParameterBarContext } from '../ParameterBar/Context';
import ProjectListItem from './ProjectListItem';




export default function ProjectsList() {
    const { sort } = useParameterBarContext<Project>();
    const projects:Project[] = useAppSelector(({ projects }) => projects);

    const sortedProjests = useMemo(() => {

        if (sort?.key) {
            return [...projects.sort((u1, u2) => (u1[sort.key] as any) - (u2[sort.key] as any))];
        } else {
            return projects
        }
    }, [sort?.key, projects])


    return (
        <List
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: 2,
            }}
        >
            {sortedProjests.map((project, index) => <ProjectListItem key={index} data={project} />)}
        </List>

    )
}
