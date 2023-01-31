import Project from "../models/project"
import { uuid } from "./commons"
import { mockFile } from "./file"
import { mockUser } from "./user"


export function mockProject():Project {
    return {
        id: uuid(),
        name: `Turbo ${uuid()} project sgffdthgt`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis tortor, luctus id velit sit amet, maximus rutrum mi.
        
         Etiam quis finibus elit, eget interdum nisi. Proin gravida faucibus justo, rhoncus sagittis neque`,
        users: new Array(4).fill(mockUser()),
        files: new Array(2).fill(mockFile()),
    }
}


// export function mockFullProject():FullProject {
//     const projectUUID = uuid();

//     return {
//         id: uuid(),
//         name: `Turbo ${uuid()} project`,
//         description: 'Project that is the best project on the earth',
//         users: new Array(4).fill(mockUser()),
//         tasks: new Array(8).fill(mockTask(projectUUID))
//     }
// }