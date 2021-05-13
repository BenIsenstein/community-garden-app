import {useEffect, useState} from 'react'
import './GardenList.css'

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
    })


    return (
        <div className='gardenlist'>
            {gardenList.map((garden) => (
                <div key={garden.name} className='gardenlistelement'>
                    <div className='Garden-sub-element'>{garden.name}</div>
                    <div className='Garden-sub-element'>Address: {garden.address}</div>
                    <div className='Garden-sub-element'>Quadrant: {garden.quadrant}</div>
                    <div className='Garden-sub-element'>{garden.coverPhoto}</div>
                    <div className='Garden-sub-element'>Size: {garden.surfaceArea}m<sup>2</sup></div>
                    <div className='Garden-sub-element'>Vacancy: {garden.vacancy ? 'yes' : 'no'}</div>
                    <br />
                </div>  
            ))}
        </div>
    )
}

export default GardenList
