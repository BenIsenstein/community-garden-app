import { TypeColumnFilter, SelectColumnFilter } from "./Filters";

export const columnHeaders = [
    {
        Header: 'Garden Name',
        accessor: 'Garden Name',
        Filter: TypeColumnFilter
    },
    {
        Header: 'Address',
        accessor: 'Address',
        Filter: TypeColumnFilter
    },
    {
        Header: 'Quadrant',
        accessor: 'Quadrant',
        Filter: SelectColumnFilter
    },
    {
        Header: 'Latitude',
        accessor: 'Lat',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Longitude',
        accessor: 'Lng',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Vacancy',
        accessor: 'Vacancy',
        Filter: SelectColumnFilter
    },
]