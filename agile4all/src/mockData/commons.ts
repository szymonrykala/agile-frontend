import { UUID } from "../models/common";


export function uuid(): UUID {
    return Math.round(Date.now()/100);
}
