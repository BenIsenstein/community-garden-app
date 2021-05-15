import './GardenListAndForm.css'


function ListGardensButton({setStateFunction}) {
    return (  
        <button className='button' onClick={() => setStateFunction()}>
            Back To Garden List
        </button> 
    )
}


export default ListGardensButton