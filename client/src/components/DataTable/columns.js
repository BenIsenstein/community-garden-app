import { TypeColumnFilter, SelectColumnFilter } from "./Filters";

export const columnHeaders = [
    {
        Header: 'Garden Name',
        accessor: 'garden_name',
        Filter: TypeColumnFilter
    },
    {
        Header: 'Quadrant',
        accessor: 'quadrant',
        Filter: SelectColumnFilter
    },
    {
        Header: 'Latitude',
        accessor: 'latitude',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Longitude',
        accessor: 'longitude',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Vacancy',
        accessor: 'vacancy',
        Filter: SelectColumnFilter
    },
]