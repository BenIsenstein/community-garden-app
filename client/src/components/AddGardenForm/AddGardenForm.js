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
            {...register(
              'nameData', 
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
              {...register(
                'addressData', 
                {
                validate: async (address) => await checkIsAddressFree(address) || 'That address is taken'
                }
              )}
            />
            {errors.addressData && <p>{errors.addressData.message}</p>}
          </div>
          <div className='Garden-form-element'>
            <label htmlFor='address'>Coordinates</label>
            <input 
              type='hidden'
              name='lat'
              {...register('lat', {validate: lat => lat !== 0 || 'You must choose coordinates.'})}
            />
            <input 
              type='hidden'
              name='lng'
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
          <label htmlFor='quadrant'>Quadrant</label>
          <div className='Quadrant-buttons' id='quadrant'>
            <div className='button'>
              <label htmlFor="NW">NW</label>
              <input type="radio" id="NW" name="quadrantData" value="NW" {...register('quadrantData', {required: {value: true, message: 'You must select a quadrant.'}})}/>  
            </div>
            <div className='button'>
              <label htmlFor="NE">NE</label>
              <input type="radio" id="NE" name="quadrantData" value="NE" {...register('quadrantData', {required: {value: true, message: 'You must select a quadrant.'}})}/>  
            </div>   
            <div className='button'>
              <label htmlFor="SW">SW</label>
              <input type="radio" id="SW" name="quadrantData" value="SW" {...register('quadrantData', {required: {value: true, message: 'You must select a quadrant.'}})}/>  
            </div>
            <div className='button'>
              <label htmlFor="SE">SE</label>
              <input type="radio" id="SE" name="quadrantData" value="SE" {...register('quadrantData', {required: {value: true, message: 'You must select a quadrant.'}})}/>  
            </div>   
          </div>
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
          <label htmlFor='Surface-area'>Total Area (sqft)</label>
          <input 
            className='Surface-area' 
            id='Surface-area' 
            name='surfaceAreaData'
            type='number'
            min='0'
            {...register(
              'surfaceAreaData', {
                required: {
                  value: true, 
                  message: 'You must input a surface area.'
                }
              }
            )}
          />
        </div>   
        <div className='Garden-form-element'> 
          <label htmlFor='vacancy'>Vacancy</label>
          <div className='Vacancy-buttons'id='vacancy'>
            <div className='button'>
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="yes" name="vacancyData" value="yes" {...register('vacancyData', {required: {value: true, message: 'You must declare whether you have room for new gardeners.'}})}/>
            </div>
            <div className='button'>
              <label htmlFor="no">No</label>
              <input type="radio" id="no" name="vacancyData" value="no" {...register('vacancyData', {required: {value: true, message: 'You must declare whether you have room for new gardeners.'}})}/>
            </div>   
          </div>  
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
    let response = await fetch(fetchUrl, fetchOptions)
    let resObject = await response.json()
  
    try {
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
    let response = await fetch(fetchUrl, fetchOptions)
    let resObject = await response.json()
  
    try {
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
    let response = await fetch(fetchUrl, fetchOptions)
    let resObject = await response.json()

    alert(resObject.successMessage)
  }
}

AddGardenForm.defaultProps = {
  name: 'AddGardenForm'
}

export default AddGardenForm
