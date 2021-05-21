import Autocomplete from "react-autocomplete"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export default function GardenSearchAutocomplete() {
  const [gardenList, setGardenList] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const getAllGardens = async () => {
    let fetchUrl = "/api/get-all-gardens"
    let response = await fetch(fetchUrl)
    let resObject = await response.json()
    let listResult = resObject.gardenList
    setGardenList(listResult)
  }

  useEffect(() => {
    getAllGardens()
  }, [])

  const filteredGardenList = !gardenList 
    ? ['Loading...']
    : gardenList.filter((garden) => {
      let gardenNameRegex = new RegExp(`.*${inputValue}.*`, "i")
      return gardenNameRegex.test(garden?.name)
  })

  const history = useHistory()
  const changeRoute = (val) => history.push(`/garden-page/${val}`)

  return (
    <div>
      <h1>
        Search for a garden, then click to visit its homepage.
      </h1>
      <Autocomplete
        getItemValue={(garden) => garden.name || garden}
        items={filteredGardenList}
        renderItem={(garden, isHighlighted) => (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>{garden?.name}</div>
        )}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSelect={(garden) => changeRoute(garden)}
        open={true}
      />
    </div>
  )
}
