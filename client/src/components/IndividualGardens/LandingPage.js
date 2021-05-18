import React, { useEffect, useState } from "react"

export default function LandingPage({name})  {
    const [gardenData, setGardenData] = useState ([])

    useEffect(() => {
        const fetchData = async () => { 
    
            let response=await fetch(`/api/get-all-gardens/individual-garden?name=${name}`)
            let resObject=await response.json() 
            setGardenData(resObject.garden)
            console.log(gardenData)
        } 
        fetchData()
    },[]) 
    return null
}

