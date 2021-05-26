import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

export default function LandingPage() {
  const { gardenName } = useParams()
  const [gardenData, setGardenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let fetchGardenUrl = `/api/garden/get/${gardenName}`
      let response = await fetch(fetchGardenUrl)
      let resObject = await response.json()
      let gardenObject = resObject.garden
      
      return gardenObject ? setGardenData(gardenObject) : setGardenData('no garden');
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>
        {!gardenData && 'Loading...'}
        {(gardenData === 'no garden') && 'This garden could not be found.'}
        {(gardenData !== 'no garden') && gardenData?.name}
      </h1>
      <div>
        {gardenData?.address}
      </div>
    </div>


  )
}
