import { TypeColumnFilter, SelectColumnFilter, NumberRangeColumnFilter } from "./Filters";

export const columnHeaders = [
    {
        Header: 'Garden Name',
        accessor: 'name',
        Filter: TypeColumnFilter,
        sticky: 'left'
    },
    {
        Header: 'Address',
        accessor: 'address',
        Filter: TypeColumnFilter,
        sticky: 'left'
    },
    {
        Header: 'Quadrant',
        accessor: 'quadrant',
        Filter: SelectColumnFilter,
        sticky: 'left'
    },
    /*{
        Header: 'Latitude',
        accessor: 'coordinates.lat',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Longitude',
        accessor: 'coordinates.lng',
        Filter: TypeColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Plot Size (sqft)',
        accessor: 'plotSize',
        Filter: TypeColumnFilter
    },*/
    {
        Header: '# of Plots',
        accessor: 'numberOfPlots',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        sticky: 'left'
    },
    {
        Header: 'Established',
        accessor: 'established',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        sticky: 'left'
    },
]