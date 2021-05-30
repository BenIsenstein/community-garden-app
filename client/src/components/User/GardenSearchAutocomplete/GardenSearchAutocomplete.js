import Autocomplete from "react-autocomplete"
import { useState, useEffect } from "react"
import NotAMemberButton from "./NotAMemberButton"

export default function GardenSearchAutocomplete({setGardenMembership}) {
  const [gardenList, setGardenList] = useState(null)
  const [inputFieldGardenName, setInputFieldGardenName] = useState('')
  
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

  const filteredGardenList = !gardenList
    ? ["Loading..."]
    : gardenList.filter((garden) => {
        let gardenNameRegex = new RegExp(`.*${inputFieldGardenName}.*`, "i")
        return gardenNameRegex.test(garden?.name)
      })

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Autocomplete
        getItemValue={(garden) => garden._id || garden}
        items={filteredGardenList}
        renderItem={(garden, isHighlighted) => (
          <div key={garden?._id} style={{ background: isHighlighted ? "lightgray" : "white" }}>{garden?.name}</div>
        )}
        value={inputFieldGardenName}
        onChange={(e) => setInputFieldGardenName(e.target.value)}
        onSelect={(id, garden) => {
          setInputFieldGardenName(garden.name)
          setGardenMembership(id)
        }}
        inputProps={{placeholder:'Search Gardens'}}
      />
      <NotAMemberButton 
        inputFieldSetter={setInputFieldGardenName}
        membershipSetter={setGardenMembership}
      />
    </div>
  )
}

