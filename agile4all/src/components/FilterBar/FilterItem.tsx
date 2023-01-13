import { Button } from "@mui/joy";


interface IFilterItem {
    clicked?: boolean,
    onClick: () => void,
    name: string,
    key: string
}


export default function FilterItem(props: IFilterItem) {
    return (
        <Button
            variant={props.clicked ? "soft" : "outlined"}
            onClick={props.onClick}
        >
            {props.name}
        </Button>
    )
}