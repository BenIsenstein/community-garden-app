import './addGardenForm.css'

function AddGardenForm() {
    return (
        <div>
            <div className='addGardenFormHeader'>
                <h1>
                    Add A Garden
                </h1>
            </div>
            <div className='addGardenForm'>
                <label htmlFor='gardenname'>Garden Name</label>
                <input className='gardenname' id='gardenname' />

                <label htmlFor='address'>Address</label>
                <input className='address' id='address' />
                    
                <label htmlFor='quadrant'>Quadrant</label>
                <div id='quadrant'>
                    <div>
                        <input type="radio" id="NW" name="quadrant" value="NW"/>
                        <label htmlFor="NW">NW</label>
                    </div>
                    <div>
                        <input type="radio" id="NE" name="quadrant" value="NE"/>
                        <label htmlFor="NE">NE</label>
                    </div>   
                    <div>
                        <input type="radio" id="SW" name="quadrant" value="SW"/>
                        <label htmlFor="SW">SW</label>
                    </div>
                    <div>
                        <input type="radio" id="SE" name="quadrant" value="SE"/>
                        <label htmlFor="SE">SE</label>
                    </div>   

                </div>
                    
                <label htmlFor='coverPhoto'>Cover Photo</label>
                <input type='file' className='coverPhoto' id='coverPhoto' />
                 
                <label htmlFor='surfaceArea'>Total Area (meters squared)</label>
                <input className='surfaceArea' id='surfaceArea' />
                    
                <label htmlFor='vacancy'>Vacancy</label>
                <div id='vacancy'>
                    <div>
                        <input type="radio" id="yes" name="vacancy" value="yes"/>
                        <label htmlFor="yes">Yes</label>
                    </div>
                    <div>
                        <input type="radio" id="no" name="vacancy" value="no"/>
                        <label htmlFor="no">No</label>
                    </div>   
                </div>   
                <button onClick={async () => await submitAddGardenForm()}>
                    Submit
                </button>
            </div>    
        </div>
    )


    async function submitAddGardenForm() {
        let nameData = document.getElementById('gardenname').value
        let addressData = document.getElementById('address').value
        let quadrantField = document.querySelector('input[name="quadrant"]:checked') || {value: ''}
        let quadrantData = quadrantField.value
        let coverPhotoData = document.getElementById('coverPhoto').value
        let surfaceAreaData = document.getElementById('surfaceArea').value
        let vacancyField = document.querySelector('input[name="vacancy"]:checked') || {value: ''}
        let vacancyData = vacancyField.value

        let submissionData = {
            nameData,
            addressData,
            quadrantData,
            coverPhotoData,
            surfaceAreaData,
            vacancyData
        }
        
        let fetchUrl = "/api/add-a-garden" //this is the proper endpoint for the final product.
        //let fetchUrl = "http://localhost:5000/api/add-a-garden" //explicit endpoint that will work even when running the client and server in separate ports.
        let fetchOptions = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(submissionData)
        }
        
        let response = await fetch(fetchUrl, fetchOptions)
        let resObject = await response.json()

        if (response.status === 400) {
            let errorMessage = ''

            for (let key in resObject) {
                errorMessage += resObject[key] + '\n\n'
            }

            //console.log(errorMessage)

            alert(errorMessage)
        }
        else {
            let successMessage = resObject.successMessage

            console.log('success!')

            alert(successMessage)
        }
    }
}


export default AddGardenForm

/*
<input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label><br>
  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label>
  <input type="radio" id="other" name="gender" value="other">
  <label for="other">Other</label>
  */