import React, { useMemo, useState, useEffect } from "react"
import { useTable, useSortBy, useFilters } from "react-table"
import { columnHeaders } from "./columns"
import { useHistory } from "react-router-dom"
import "./table.css"

export default function FilteringTable() {
  const loadingMessage = [{name: 'Loading...', address: "This won't take long!"}]
  const [gardenList, setGardenList] = useState(loadingMessage)
  useEffect(() => {
    const getAllGardens = async () => {
      let fetchUrl = "/api/get-all-gardens"
      let response = await fetch(fetchUrl)
      let resObject = await response.json()
      let listResult = resObject.gardenList

      setGardenList(listResult)
    }
    getAllGardens()
  }, [])

  const history = useHistory()
  const changeRoute = (val) => history.push(`/garden-page/${val}`)

  // Prevent re-rendering of data
  const columns = useMemo(() => columnHeaders, [])
  const data = useMemo(() => gardenList, [gardenList]) 

  let tableInstance = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span>
                    {/* if column is sorted -> check if sorted in descending order */}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr onClick={() => changeRoute(row.values.name)} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // access cells in each row
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td> // renders cell value for each column
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

