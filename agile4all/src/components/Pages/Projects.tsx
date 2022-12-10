import { List } from "@mui/joy";
import { mockProject } from "../../mockData/projects";
import ProjectItem from "../Projects/ProjectItem";


const projects = new Array(3).fill(mockProject());

console.log(projects)

export default function Projects() {
    return (
        <List
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
            }}
        >
            {
                projects.map((item, index) => <ProjectItem data={item} index={index} />)
            }
        </List>
    )
}
