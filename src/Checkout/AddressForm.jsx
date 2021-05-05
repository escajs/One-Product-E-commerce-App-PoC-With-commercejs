
import { useState,useEffect } from 'react'
import { commerce } from '../Commerce/commerce'
const AddressForm = ({shippingData,setShippingData,checkoutToken}) => {
    //Subdivisition states
    const [Countries,setCountries] = useState([])
    const [subDivisions,setSubDivisions] = useState([])
    const [shippingOptions,setShippingOptions] = useState([])
    //Custom Errors
    //Fetching Functions
    const fetchCountries = async (checkoutToken) =>{
      try {
        const {countries} = await commerce.services.localeListShippingCountries(String(checkoutToken.id))
        setCountries(countries)
        setShippingData({...shippingData,country:'AM'})
      } catch (error) {
          console.log(error)
      }
      
    }

    const fetchSubDivisions = async (countryCode = 'AM') =>{
        try {
         const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
         setSubDivisions(subdivisions)
        } catch (error) {
            console.log('error from subdivs : ',error)
        }
    }

    const fetchShippingOptions = async (checkoutId,country,region="AG") =>{
        const options = await commerce.checkout.getShippingOptions(checkoutId,{country,region})
        setShippingOptions(options)
        setShippingData({...shippingData,shippingOption:options[0].id})
    }

    const changeHandler = (e) =>{
        setShippingData({...shippingData,[e.target.name] : e.target.value})
    }


    useEffect(()=>{
        fetchCountries(checkoutToken)
    },[])
    useEffect(()=>{
        if(shippingData.country) fetchSubDivisions(shippingData.country)
        //for the first render
        fetchShippingOptions(checkoutToken.id,shippingData.country,shippingData.subdivision)
    },[shippingData.country])
    
    useEffect(()=>{
      if(shippingData.subdivision) fetchShippingOptions(checkoutToken.id,shippingData.country,shippingData.subdivision)
    },[shippingData.subdivision])
 console.log('Shipping options : ',shippingOptions)
    return (
        <form className="row">
        <div className="input-field col s12 m6">
            <input pattern="[a-zA-Z ]{1,20}" className="validate" type="text" name="firstName" id="firstName" onChange={changeHandler}/>
            <label for="firstName">First Name*</label>
            <span class="helper-text" data-error="Inavalid firstname"></span>
        </div>

        <div className="input-field col s12 m6">
            <input pattern="[a-zA-Z ]{1,20}" className="validate" type="text" name="lastName" id="lastName" onChange={changeHandler}/>
            <label for="lastName">LastName*</label>
            <span class="helper-text" data-error="Inavalid lastname"></span>
        </div>

        <div className="input-field col s12 m6">
            <input pattern="[a-zA-Z0-9 ]{1,}"className="validate" type="text" name="address" id="address" onChange={changeHandler}/>
            <label for="address">Address *</label>
            <span class="helper-text" data-error="Inavalid Address"></span>
        </div>

        <div className="input-field col s12 m6">
            <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" type="email" name="email" id="email" class="validate" onChange={changeHandler}/>
            <label for="email">E-mail*</label>
            <span class="helper-text" data-error="Inavalid E-mail"></span>
        </div>

        <div className="input-field col s12 m6">
            <input pattern="[a-zA-Z]{1,30}" className="validate" type="text" name="city" id="city" onChange={changeHandler}/>
            <label for="city">City *</label>
           <span className="helper-text" data-error="Invalid city"></span>
        </div>

        <div className="input-field col s12 m6">
            <input pattern="[0-9]{1,10}" className="validate" type="text" name="zip" id="zip" onChange={changeHandler}/>
            <label for="zip">ZIP CODE*</label>
            <span className="helper-text" data-error="Invalid postal code"></span>
        </div>

        <div className="input-field col s12 m6">
        <span style={{color:'#9e9e9e'}}>Country*</span>
           <select name="country" id="country" className="browser-default" onChange={changeHandler}>
               {Object.entries(Countries).map(([code,country])=>(
                   <option value={code}>{country}</option>
               ))}
           </select>
           
        </div>

        <div className="input-field col s12 m6">
        <span style={{color:'#9e9e9e'}}>Region*</span>
        <select name="subdivision" id="subdivision" className="browser-default" onChange={changeHandler}>
             {Object.entries(subDivisions).map(([code,country])=>(
                   <option value={code}>{country}</option>
               ))}
           </select>
        </div>

                
        <div className="input-field col s12 m6">
        <span style={{color:'#9e9e9e'}}>Shipping Option*</span>
        <select name="shippingOption" id="shippingOption" className="browser-default" onChange={changeHandler}>
           {shippingOptions.map(sO=>(
               <option value={sO.id}>{sO.description} - {sO.price.formatted_with_symbol}</option>
           ))}
           </select>
        </div>

        </form>
    );
}
 
export default AddressForm;