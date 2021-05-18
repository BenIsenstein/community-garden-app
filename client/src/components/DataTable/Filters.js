import React from 'react'

const TypeColumnFilter = ({ column }) => {
    const {filterValue, setFilter } = column
    return (
        <span>
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} placeholder={'Search'} />
        </span>
    )
}

const SelectColumnFilter = ({ column }) => {
    const { filterValue, setFilter, preFilteredRows, id } = column

    // Calculate the options for multi-select box
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

const GlobalFilter = ({ filter, setFilter}) => {
    return (
        <span>
            Search: {' '}
            <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}

export {
    TypeColumnFilter,
    SelectColumnFilter,
    GlobalFilter
}