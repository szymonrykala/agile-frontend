import { UUID } from "../models/common";


export function uuid(): UUID {
    return Date.now().toString(16);
}
