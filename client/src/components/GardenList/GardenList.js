import {useEffect, useState} from 'react'
import './gardenList.css'
import './gardenListElement.css'

function GardenList() {
    const [gardenList, setGardenList] = useState([])

    useEffect(() => {
        async function getAllGardens() {
            let fetchUrl = "/api/get-all-gardens" 
            let response = await fetch(fetchUrl)
            let resObject = await response.json()
            let gardenList = resObject.gardenList

            setGardenList(gardenList)
        }
        getAllGardens()
    }, [])


    return (
        <div className='gardenlist'>
            {gardenList.map((garden) => (
                <div key={garden.name} className='gardenlistelement'>
                    <div>{garden.name}</div>
                    <div>Address: {garden.address}</div>
                    <div>Quadrant: {garden.quadrant}</div>
                    <div>{garden.coverPhoto}</div>
                    <div>Size: {garden.surfaceArea}m<sup>2</sup></div>
                    <div>Vacancy: {garden.vacancy ? 'yes' : 'no'}</div>
                    <br />
                </div>  
            ))}
        </div>
    )
}

export default GardenList
