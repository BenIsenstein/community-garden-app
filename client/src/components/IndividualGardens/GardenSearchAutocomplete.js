import Autocomplete from "react-autocomplete"
import { useState, useEffect } from "react"

export default function GardenSearchAutocomplete({setGardenMembership}) {
  const [gardenList, setGardenList] = useState(null)
  const [inputFieldGardenName, setInputFieldGardenName] = useState('')
  
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

  const filteredGardenList = !gardenList
    ? ["Loading..."]
    : gardenList.filter((garden) => {
        let gardenNameRegex = new RegExp(`.*${inputFieldGardenName}.*`, "i")
        return gardenNameRegex.test(garden?.name)
      })

  return (
    <Autocomplete
      getItemValue={(garden) => garden._id || garden}
      items={filteredGardenList}
      renderItem={(garden, isHighlighted) => (
        <div style={{ background: isHighlighted ? "lightgray" : "white" }}>{garden?.name}</div>
      )}
      value={inputFieldGardenName}
      onChange={(e) => setInputFieldGardenName(e.target.value)}
      onSelect={(id, garden) => {
        setInputFieldGardenName(garden.name)
        setGardenMembership(id)
      }}
      inputProps={{placeholder:'Search Gardens'}}
    />
  )
}
