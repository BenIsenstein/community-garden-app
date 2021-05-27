import React, { useMemo, useState, useEffect } from "react"
import { useTable, useSortBy, useFilters, useBlockLayout } from "react-table"
import { useSticky } from 'react-table-sticky'
import { Styles } from './TableStyle'
import { columnHeaders } from "./columns"
import { useHistory } from "react-router-dom"

export default function GardenTable() {
  const loadingMessage = [{name: 'Loading...', address: "This won't take long!"}]
  const [gardenList, setGardenList] = useState(loadingMessage)
  useEffect(() => {
    const getAllGardens = async () => {
      let fetchUrl = "/api/garden/get"
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
    useSortBy,
    useBlockLayout,
    useSticky
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    const firstPageRows = rows.slice(0,100)

    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
        <Styles>
          <div {...getTableProps()} className="table sticky" style={{ width: 570, height: '625px' }}>
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render("Filter") : null}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {firstPageRows.map((row) => {
                prepareRow(row);
                return (
                  <div onClick={() => changeRoute(row.values.name)} {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
      </div>
      );
    }