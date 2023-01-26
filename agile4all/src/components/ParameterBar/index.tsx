import { Input, Option, Select, Sheet, Stack, Typography } from "@mui/joy";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ISortItem, useParameterBarContext } from "./Context";
import FilterItem from "./ParameterItem";


interface IParameterBar<T> {
    filters?: (keyof T & string)[],
    sorts?: ISortItem<T>[],
    // search?: string,

    init: {
        sort?: number,
        filter?: number,
        // search?: string,
    }
}


export default function ParameterBar<T>({ sorts, filters, init }: IParameterBar<T>) {
    const { setSort, setFilter, filter, sort } = useParameterBarContext<T>();

    const [filterStr, setFilterStr] = useState<string>('');
    const [trigger, setTrigger] = useState<any>();

    useLayoutEffect(() => {
        sorts && init.sort && setSort(sorts[init.sort]);
        filters && init.filter && setFilter({ key: filters[init.filter], value: '' });
        // search && init.search && setSearch(init.search);
    }, [])


    const delayedUpdateFilterValue = useCallback((evt:React.ChangeEvent<HTMLInputElement>)=>{
        setFilterStr(evt.target.value);

        clearTimeout(trigger);
        let timer = setTimeout(() => {
            filter && setFilter({ ...filter, value: filterStr });
        }, 1000);
        setTrigger(timer);
    },[])


    return (
        <Sheet
            sx={{
                padding: 1,
                gap: 3,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                bgcolor: 'background.componentBg'
            }}
        >
            {sorts &&
                <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
                    <Typography level='body2'>
                        Sort by:
                    </Typography>
                    {sorts?.map((_sort, index) =>
                        <FilterItem
                            key={index}
                            onClick={() => setSort(_sort)}
                            clicked={_sort.key === sort?.key}
                            name={_sort.name}
                        />)
                    }
                </Stack>
            }
            {filters &&
                <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
                    <Typography level='body2'>
                        Filter
                    </Typography>
                    <Select
                        variant="soft"
                        size="sm"
                        value={filter?.key || 'id'}
                        onChange={(evt, value: any) => filter && setFilter({ ...filter, key: value as keyof T & string })}
                    >
                        {
                            filters.map((field, index) =>
                                <Option key={index} value={field}>{field as string}</Option>
                            )
                        }
                    </Select>
                    <Typography level='body2'>
                        by
                    </Typography>
                    <Input
                        size="sm"
                        value={filterStr}
                        onChange={delayedUpdateFilterValue}
                        placeholder='filter value'
                        sx={{
                            minWidth: '50px'
                        }}
                    />
                </Stack>
            }
        </Sheet>
    )
}