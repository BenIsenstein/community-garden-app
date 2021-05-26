import './AddGardenForm.css'
import { useEffect } from 'react'
import { useForm } from "react-hook-form";

function AddGardenForm({formCoordinates}) {
  const { register, handleSubmit, onChange, setValue, formState: { errors } } = useForm();
  const lat = formCoordinates.lat
  const lng = formCoordinates.lng

  useEffect(() => {
    setValue('lat', lat)
    setValue('lng', lng)

  }, [lat, lng])
          
  return (
    <form onSubmit={handleSubmit(submitAddGardenForm)}>   
      <h1 className='Add-garden-form-header'>
        Add A Garden
      </h1>
      <div className='Add-garden-form'>
        <div className='Garden-form-element'>
          <label htmlFor='Garden-name'>Garden Name</label>
          <input 
            className='Garden-name' 
            id='Garden-name' 
            name='nameData'
            onChange={onChange}
            {...register('nameData', 
              {
                validate: async (name) => await checkIsNameFree(name) || 'That name is taken.',
                required: 'You must input a name for your garden.'
              }
            )}
          />
          {errors.nameData && <p>{errors.nameData.message}</p>}
        </div>
        <div className='Address-and-coordinates'>
          <div className='Garden-form-element'>
            <label htmlFor='address'>Address</label>
            <input 
              className='address' 
              id='address' 
              name='addressData'
              onChange={onChange}
              {...register('addressData', {validate: async (address) => await checkIsAddressFree(address) || 'That address is taken'})}
            />
            {errors.addressData && <p>{errors.addressData.message}</p>}
          </div>
          <div className='Garden-form-element'>
            <label htmlFor='address'>Coordinates</label>
            <input 
              type='hidden'
              name='lat'
              onChange={onChange}
              {...register('lat', {validate: lat => lat !== 0 || 'You must choose coordinates.'})}
            />
            <input 
              type='hidden'
              name='lng'
              onChange={onChange}
              {...register('lng')}
            />
            <div id='coordinates'>
              <div>Lat: {lat || 'No coordinates given'}</div>
              <div>Lng: {lng || 'No coordinates given'}</div>  
            </div>
            {errors.lat && <p>{errors.lat.message}</p>}
          </div>
        </div>
        <div className='Garden-form-element'>
          <label htmlFor='Established'>Established</label>
          <input 
            className='Established' 
            id='Established' 
            name='establishedData'
            type='number'
            min='1900'
            {...register('establishedData', {required: 'You must input a year established.'})}
          />
          {errors.establishedData && <p>{errors.establishedData.message}</p>}
        </div>
        <div className='Garden-form-element'>
          <label htmlFor='quadrant'>Quadrant</label>
          <div className='Quadrant-buttons' id='quadrant'>
            <div className='button'>
              <label htmlFor="NW">NW</label>
              <input type="radio" id="NW" name="quadrantData" value="NW" {...register('quadrantData', {required: 'You must select a quadrant.'})}/>  
            </div>
            <div className='button'>
              <label htmlFor="NE">NE</label>
              <input type="radio" id="NE" name="quadrantData" value="NE" {...register('quadrantData', {required: 'You must select a quadrant.'})}/>  
            </div>   
            <div className='button'>
              <label htmlFor="SW">SW</label>
              <input type="radio" id="SW" name="quadrantData" value="SW" {...register('quadrantData', {required: 'You must select a quadrant.'})}/>  
            </div>
            <div className='button'>
              <label htmlFor="SE">SE</label>
              <input type="radio" id="SE" name="quadrantData" value="SE" {...register('quadrantData', {required: 'You must select a quadrant.'})}/>  
            </div>   
          </div>
          {errors.quadrantData && <p>{errors.quadrantData.message}</p>}
        </div>
        <div className='Garden-form-element'>   
          <label className='Cover-photo-label' htmlFor='Cover-photo'>Cover Photo</label>
          <input 
            type='file' 
            className='Cover-photo' 
            id='Cover-photo' 
            name='coverPhotoData'
            {...register('coverPhotoData')}
          />
        </div> 
        <div className='Garden-form-element'>
          <label htmlFor='Plot-size'>Plot Size (sqft)</label>
          <input 
            className='Plot-size' 
            id='Plot-size' 
            name='plotSizeData'
            type='number'
            min='0'
            {...register('plotSizeData', {required: 'You must input a plot size.'})}
          />
          {errors.plotSizeData && <p>{errors.plotSizeData.message}</p>}
        </div>
        <div className='Garden-form-element'>
          <label htmlFor='Number-of-plots'>Number of Plots</label>
          <input 
            className='Number-of-plots' 
            id='Number-of-plots' 
            name='numberOfPlotsData'
            type='number'
            min='0'
            {...register('numberOfPlotsData', {required: 'You must input a number of plots.'})}
          />
          {errors.numberOfPlotsData && <p>{errors.numberOfPlotsData.message}</p>}
        </div>
        <div className='Garden-form-element'>
          <label htmlFor='Postal-code'>Postal Code</label>
          <input 
            className='Postal-code' 
            id='Postal-code' 
            name='postalCodeData'
            {...register('postalCodeData', {required: 'You must input a postal code.'})}
          />
          {errors.postalCodeData && <p>{errors.postalCodeData.message}</p>}
        </div>      
        <div className='Garden-form-element'>
          <label htmlFor='Fee'>Annual Membership Fee</label>
          <input 
            className='Fee' 
            id='Fee' 
            name='feeData'
            placeholder='Leave blank if no fee'
            {...register('feeData')}
          />
        </div>
        <div className='Garden-form-element'> 
          <label htmlFor='vacancy'>Vacancy</label>
          <div className='Vacancy-buttons'id='vacancy'>
            <div className='button'>
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="yes" name="vacancyData" value="yes" {...register('vacancyData', {required:  'You must declare whether you have room for new gardeners.'})}/>
            </div>
            <div className='button'>
              <label htmlFor="no">No</label>
              <input type="radio" id="no" name="vacancyData" value="no" {...register('vacancyData', {required: 'You must declare whether you have room for new gardeners.'})}/>
            </div>   
          </div> 
          {errors.vacancyData && <p>{errors.vacancyData.message}</p>} 
        </div> 
        <div className='Garden-form-element'>
          <label htmlFor='Description'>Description</label>
          <input 
            className='Description' 
            id='Description' 
            name='descriptionData'
            {...register('descriptionData', {required: "You must write a description."})}
          />
          {errors.descriptionData && <p>{errors.descriptionData.message}</p>}
        </div>  
        <div className='Garden-form-element'>
          <label htmlFor='Website'>Website</label>
          <input 
            className='Website' 
            id='Website' 
            name='websiteData'
            placeholder='Leave blank if no website'
            {...register('websiteData')}
          />
        </div> 
        <div className='Garden-form-element'>
          <label htmlFor='Email'>Garden Admin Email</label>
          <input 
            className='Email' 
            id='Email' 
            name='emailData'
            {...register('emailData', {required: "You must include an email for security reasons. We won't spam you, we promise :)"})}
          />
          {errors.emailData && <p>{errors.emailData.message}</p>}
        </div> 
        <div className='Garden-form-element'> 
          <label htmlFor='Accessibility'>Is your garden Wheelchair-Accessible?</label>
          <div className='Accessibility-buttons'id='Accessibility'>
            <div className='button'>
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="yes" name="accessibilityData" value="yes" {...register('accessibilityData', {required:  'You must declare whether your garden is wheelchair-accessible.'})}/>
            </div>
            <div className='button'>
              <label htmlFor="no">No</label>
              <input type="radio" id="no" name="accessibilityData" value="no" {...register('accessibilityData', {required: 'You must declare whether your garden is wheelchair-accessible.'})}/>
            </div>   
          </div> 
          {errors.accessibilityData && <p>{errors.accessibilityData.message}</p>} 
        </div> 
        <div className='Garden-form-element'>
          <input type='submit' value='submit' />
        </div>
      </div>    
    </form>
  )

  async function checkIsNameFree(name) {
    let submissionData = {nameData: name}
    let fetchUrl = "/api/add-a-garden/check-is-name-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submissionData)
    }
    
    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()

      return resObject.result
    }
    catch (err) {
      console.error('Error validating name in MongoDBAtlas Cluster!', err)
    }
  }


  async function checkIsAddressFree(address) {
    let submissionData = {addressData: address}
    let fetchUrl = "/api/add-a-garden/check-is-address-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submissionData)
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
  
      return !address ? true : resObject.result
    }
    catch (err) {
      console.error('Error validating address in MongoDBAtlas Cluster!', err)
    }
  }

  async function submitAddGardenForm(data) {
    data.coordinatesData={lat, lng}

    let fetchUrl = "/api/add-a-garden" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()

      alert(resObject.successMessage)
    }
    catch (err) {
      alert("There was an error adding your garden. We're solving it as fast as we can.")
      console.error('Error submitting garden to server!', err)
    }
  }
}

export default AddGardenForm
