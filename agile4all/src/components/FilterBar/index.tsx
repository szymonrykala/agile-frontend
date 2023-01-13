import { Sheet } from "@mui/joy";
import React from "react";
import FilterItem from "./FilterItem";


const filters = [
    {
        name: 'project id',
        key: 'projectId'
    },
    {
        name: 'user id',
        key: 'userId'
    },
    {
        name: 'project id',
        key: 'projectId'
    },
    {
        name: 'user id',
        key: 'userId'
    }
]


export default function FilterBar() {
    const [clicked, setClicked] = React.useState<Number>(0)

    function filterClickHandle(index: Number) {
        setClicked(index)
    }

    return (
        <Sheet
            sx={{
                padding: 1,
                gap: 1,
                display: 'flex'
            }}
        >
            {
                filters.map((filter, index) =>
                    <FilterItem
                        onClick={() => filterClickHandle(index)}
                        clicked={clicked === index}
                        name={filter.name}
                        key={filter.key}
                    />)
            }
            {/* <FilterItem name='project id' key='projectId' /> */}
            {/* <FilterItem clicked={true} name='project id' key='projectId' /> */}
        </Sheet>
    )
}