import File from "../models/file";
import { uuid } from "./commons";


export function mockFile():File{
    return {
        id: uuid(),
        link: "https://app.swaggerhub.com/apis",
        name: "analiza buga.txt",
        userId: uuid(),
        modificationDate: new Date()
    }
}