import './addGardenForm.css'
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
    <form 
      className ='Add-garden-form' onSubmit={handleSubmit(submitAddGardenForm)}
    >   
      <h1 className='Add-garden-form-header'>
        Add A Garden
      </h1>
      <div style={{width:'100%'}}>
        <div className='Garden-form-row'> {/* Name & established */}
          <div className='Garden-form-element'>
            <label htmlFor='Garden-name'>Garden Name</label>
            <input 
              className='Garden-name' 
              id='Garden-name' 
              name='name'
              onChange={onChange}
              {...register('name', 
                {
                  validate: async (name) => await checkIsNameFree(name) || 'That name is taken.',
                  required: 'You must input a name for your garden.'
                }
              )}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className='Garden-form-element'>
            <label htmlFor='Established'>Established</label>
            <input 
              className='Established' 
              id='Established' 
              name='established'
              type='number'
              min='1900'
              {...register('established', {required: 'You must input a year established.'})}
            />
            {errors.established && <p>{errors.established.message}</p>}
          </div>
        </div>
        <div className='Garden-form-row'> {/* Address & Postal Code */}
          <div className='Garden-form-element'>
            <label htmlFor='address'>Address</label>
            <input 
              className='address' 
              id='address' 
              name='address'
              onChange={onChange}
              {...register('address', {validate: async (address) => await checkIsAddressFree(address) || 'That address is taken'})}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div className='Garden-form-element'>
            <label htmlFor='Postal-code'>Postal Code</label>
            <input 
              className='Postal-code' 
              id='Postal-code' 
              name='postalCode'
              {...register('postalCode', {required: 'You must input a postal code.'})}
            />
            {errors.postalCode && <p>{errors.postalCode.message}</p>}
          </div>      
        </div>
        <div className='Garden-form-row'> {/* Coordinates & Quadrant */}
          <div className='Garden-form-element'>
            <label htmlFor='quadrant'>Quadrant</label>
            <div className='Quadrant-buttons' id='quadrant'>
              <div className='button'>
                <label htmlFor="NW">NW</label>
                <input type="radio" id="NW" name="quadrant" value="NW" {...register('quadrant', {required: 'You must select a quadrant.'})}/>  
              </div>
              <div className='button'>
                <label htmlFor="NE">NE</label>
                <input type="radio" id="NE" name="quadrant" value="NE" {...register('quadrant', {required: 'You must select a quadrant.'})}/>  
              </div>   
              <div className='button'>
                <label htmlFor="SW">SW</label>
                <input type="radio" id="SW" name="quadrant" value="SW" {...register('quadrant', {required: 'You must select a quadrant.'})}/>  
              </div>
              <div className='button'>
                <label htmlFor="SE">SE</label>
                <input type="radio" id="SE" name="quadrant" value="SE" {...register('quadrant', {required: 'You must select a quadrant.'})}/>  
              </div>   
            </div>
            {errors.quadrant && <p>{errors.quadrant.message}</p>}
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
        <div className='Garden-form-row'> {/* Plot size & # of plots*/}
          <div className='Garden-form-element'>
            <label htmlFor='Plot-size'>Plot Size (sqft)</label>
            <input 
              className='Plot-size' 
              id='Plot-size' 
              name='plotSize'
              type='number'
              min='0'
              {...register('plotSize', {required: 'You must input a plot size.'})}
            />
            {errors.plotSize && <p>{errors.plotSize.message}</p>}
          </div>
          <div className='Garden-form-element'>
            <label htmlFor='Number-of-plots'>Number of Plots</label>
            <input 
              className='Number-of-plots' 
              id='Number-of-plots' 
              name='numberOfPlots'
              type='number'
              min='0'
              {...register('numberOfPlots', {required: 'You must input a number of plots.'})}
            />
            {errors.numberOfPlots && <p>{errors.numberOfPlots.message}</p>}
          </div>
        </div>
        <div className='Garden-form-row' style={{alignItems:'center'}}> {/* Vacancy, wheelchair, fee */}
          <div className='Garden-form-element'>
            <label htmlFor='Fee'>Annual Membership Fee</label>
            <input 
              className='Fee' 
              id='Fee' 
              name='fee'
              placeholder='Leave blank if no fee'
              {...register('fee')}
            />
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <div className='Garden-form-element'> 
            <label htmlFor='vacancy'>Vacancy</label>
            <div className='Vacancy-buttons'id='vacancy'>
              <div className='button'>
                <label htmlFor="yes">Yes&nbsp;</label>
                <input type="radio" id="yes" name="vacancy" value="yes" {...register('vacancy', {required:  'You must declare vacancy.'})}/>
              </div>
              <div className='button'>
                <label htmlFor="no">No&nbsp;</label>
                <input type="radio" id="no" name="vacancy" value="no" {...register('vacancy', {required: 'You must declare vacancy.'})}/>
              </div>   
            </div> 
            {errors.vacancy && <p>{errors.vacancy.message}</p>} 
          </div>
          <div className='Garden-form-element'> 
            <label htmlFor='wheelchairAccessible'>Wheelchair-Accessible?</label>
            <div className='Accessibility-buttons'id='wheelchairAccessible'>
              <div className='button'>
                <label htmlFor="yes">Yes&nbsp;</label>
                <input type="radio" id="yes" name="wheelchairAccessible" value="yes" {...register('wheelchairAccessible', {required:  'You must declare whether your garden is wheelchair-accessible.'})}/>
              </div>
              <div className='button'>
                <label htmlFor="no">No&nbsp;</label>
                <input type="radio" id="no" name="wheelchairAccessible" value="no" {...register('wheelchairAccessible', {required: 'You must declare whether your garden is wheelchair-accessible.'})}/>
              </div>   
            </div> 
            {errors.wheelchairAccessible && <p>{errors.wheelchairAccessible.message}</p>} 
          </div>
        </div>
        </div>  
        <div className='Garden-form-row'> {/* Website & email */}
          <div className='Garden-form-element'>
            <label htmlFor='Website'>Website</label>
            <input 
              className='Website' 
              id='Website' 
              name='website'
              placeholder='Leave blank if no website'
              {...register('website')}
            />
          </div> 
          <div className='Garden-form-element'>
            <label htmlFor='Email'>Garden Admin Email</label>
            <input 
              className='Email' 
              id='Email' 
              name='email'
              {...register('email', {required: "You must include an email for security reasons. We won't spam you, we promise :)"})}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div> 
        </div>
        
        <div className='Garden-form-element'> {/* Description */}
            <label htmlFor='Description'>Description</label>
            <textarea 
              className='Description' 
              id='Description' 
              name='description'
              {...register('description', {required: "You must write a description."})}
            >              
            </textarea>
            
            {errors.description && <p>{errors.description.message}</p>}
          </div> 
        <div className='Garden-form-element'>
          <input type='submit' value='submit' />
        </div>
      </div>    
    </form>
  )

  async function checkIsNameFree(name) {
    let submission = {nameData: name}
    let fetchUrl = "/api/garden/check-is-name-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submission)
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
    let submission = {addressData: address}
    let fetchUrl = "/api/garden/check-is-address-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submission)
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
    data.coordinates={lat, lng}

    let fetchUrl = "/api/garden/add" 
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