import './ListFormButtons.css'


function ListGardensButton({setStateFunction}) {
    return (  
        <button className='List-garden-button' onClick={() => setStateFunction()}>
            Back To Garden List
        </button> 
    )
}


export default ListGardensButton