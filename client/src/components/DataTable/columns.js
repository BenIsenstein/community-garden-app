import { TypeColumnFilter, SelectColumnFilter } from "./Filters";

export const columnHeaders = [
    {
        Header: 'Garden Name',
        accessor: 'name',
        Filter: TypeColumnFilter
    },
    {
        Header: 'Address',
        accessor: 'address',
        Filter: TypeColumnFilter
    },
    {
        Header: 'Quadrant',
        accessor: 'quadrant',
        Filter: SelectColumnFilter
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
        Filter: TypeColumnFilter
    },
    {
        Header: 'Established',
        accessor: 'established',
        Filter: TypeColumnFilter
    },
]