import React,{useState,useEffect} from 'react'
import { commerce } from '../../Commerce/commerce'
import Preloader from '../../Preloader'
import AddressForm from "../AddressForm"
import PaymentForm from '../PaymentForm'

const Checkout = ({cartId,handleCaptureCheckout,order,isNotPaid}) => {
const [shippingData,setShippingData] = useState({
    firstName:'',
    lastName:'',
    address:'',
    email:'',
    city:'',
    zip:'',
    country:'',
    subdivision:'',
    shippingOption:''
})
const [checkoutToken,setCheckoutToken] = useState(null)


useEffect(()=>{
    const generateToken = async (cartId) => {
        try {
            const token = await commerce.checkout.generateToken(cartId,{type:'cart'})
            setCheckoutToken(token)
            console.log('checkout token --->',token)
        } catch (error) {
            console.log(error)
        }
    }
   if(cartId){
    generateToken(cartId)
    //for the refreshed cart
   }
},[cartId])
console.log('shipping info',shippingData)
    return (  
        <section className="row section">
            <div className="col s12 m6">
                <h3 className="left-align">Shipping Details</h3>
              
             {!checkoutToken && isNotPaid ?  
             <Preloader/>
             :<AddressForm setShippingData={setShippingData} checkoutToken={checkoutToken} shippingData={shippingData}/>}
            </div>
            <div className="col s12 m6">
            <h3 className="left-align">Your Order<sub><small><a href="/cart">&nbsp;<i className="material-icons">edit</i></a></small></sub></h3>
            {!checkoutToken && isNotPaid ? 
            <Preloader/>
            :<PaymentForm orderSummary={checkoutToken} shippingData={shippingData} handleCaptureCheckout={handleCaptureCheckout} />}
            </div>
            <div className="col s12">
            </div>
        </section>
    );
}
 
export default Checkout;