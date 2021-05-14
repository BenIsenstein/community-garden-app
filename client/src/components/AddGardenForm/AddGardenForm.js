import './AddGardenForm.css'

function AddGardenForm({formCoordinates}) {
    return (
        <div>  
            <h1 className='Add-garden-form-header'>
              Add A Garden
            </h1>
            <div className='Add-garden-form'>
                <div className='Garden-form-element'>
                  <label htmlFor='Garden-name'>Garden Name</label>
                  <input className='Garden-name' id='Garden-name' />
                </div>
                <div className='Address-and-coordinates'>
                  <div className='Garden-form-element'>
                    <label htmlFor='address'>Address</label>
                    <input className='address' id='address' />
                  </div>
                  <div className='Garden-form-element'>
                    <label htmlFor='address'>Coordinates</label>
                    <div id='coordinates'>Lat: {formCoordinates.lat} Lng: {formCoordinates.lng}</div>  
                  </div>
                </div>
                <div className='Garden-form-element'>
                  <label htmlFor='quadrant'>Quadrant</label>
                  <div className='Quadrant-buttons' id='quadrant'>
                    <div className='button'>
                      <label htmlFor="NW">NW</label>
                      <input type="radio" id="NW" name="quadrant" value="NW"/>  
                    </div>
                    <div className='button'>
                      <label htmlFor="NE">NE</label>
                      <input type="radio" id="NE" name="quadrant" value="NE"/>  
                    </div>   
                    <div className='button'>
                      <label htmlFor="SW">SW</label>
                      <input type="radio" id="SW" name="quadrant" value="SW"/>  
                    </div>
                    <div className='button'>
                      <label htmlFor="SE">SE</label>
                      <input type="radio" id="SE" name="quadrant" value="SE"/>  
                    </div>   
                  </div>
                </div>
                <div className='Garden-form-element'>   
                  <label className='Cover-photo-label' htmlFor='Cover-photo'>Cover Photo</label>
                  <input type='file' className='Cover-photo' id='Cover-photo' />
                </div> 
                <div className='Garden-form-element'>
                  <label htmlFor='Surface-area'>Total Area (sqft)</label>
                  <input className='Surface-area' id='Surface-area' />
                </div>   
                <div className='Garden-form-element'> 
                  <label htmlFor='vacancy'>Vacancy</label>
                  <div className='Vacancy-buttons'id='vacancy'>
                    <div className='button'>
                      <label htmlFor="yes">Yes</label>
                      <input type="radio" id="yes" name="vacancy" value="yes"/>
                    </div>
                    <div className='button'>
                      <label htmlFor="no">No</label>
                      <input type="radio" id="no" name="vacancy" value="no"/>
                    </div>   
                  </div>  
                </div> 
                <div className='Garden-form-element'>
                  <button onClick={async () => await submitAddGardenForm()}>
                    Submit
                  </button>
                </div>
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

AddGardenForm.defaultProps = {
  name: 'AddGardenForm'
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