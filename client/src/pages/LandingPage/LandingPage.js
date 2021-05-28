import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import EditGardenButton from "./EditGardenButton";

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
      <h1 style={{display: 'flex'}}>
        {!gardenData && 'Loading...'}
        {(gardenData === 'no garden') && 'This garden could not be found.'}
        {(gardenData !== 'no garden') && gardenData?.name}
        {(typeof gardenData === 'object') && <EditGardenButton />}

      </h1>
      <div>
        {gardenData?.address}
      </div>

      <div class ="header2"><h2>History</h2>
     
      </div>


    </div>


  )
}
