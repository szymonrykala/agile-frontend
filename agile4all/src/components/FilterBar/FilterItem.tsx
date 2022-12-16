import { Button, Chip } from "@mui/joy";
import React from "react";


interface IFilterItem {
    clicked?: boolean,
    onClick: () => void,
    name: string,
    key: string
}


export default function FilterItem(props: IFilterItem) {
    // const [clicked, setClicked] = React.useState<boolean>(props.clicked || false)

    // const clickHandle = () => setClicked(!clicked)

    return (
        <Button
            variant={props.clicked ? "soft" : "outlined"}
            onClick={props.onClick}
        >
            {props.name}
        </Button>
    )
}