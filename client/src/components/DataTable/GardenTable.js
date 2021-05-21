import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import mockData from './gardenData.json'
import { columnHeaders } from './columns'
import './table.css'

export default function FilteringTable() {

    // Prevent re-rendering of data
    const columns = useMemo(() => columnHeaders, [])
    const data = useMemo(() => mockData, [])

    const tableInstance = useTable({
        columns,
        data,
    },
    useFilters,
    useSortBy)

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                                {column.render('Header')}
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                <span>
                                    {/* if column is sorted -> check if sorted in descending order */}
                                    {column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => { // access cells in each row
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td> // renders cell value for each column
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}