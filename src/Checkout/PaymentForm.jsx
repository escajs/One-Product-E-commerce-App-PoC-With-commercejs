import Review from "./Checkout/Review"
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_KEj0D3HMj4MeXNR8aAJcP18y00SNLn40Qp')
const PaymentForm = ({orderSummary,shippingData,handleCaptureCheckout}) => {
    const submitHandler =async (e,elements,stripe) =>{
        e.preventDefault()
        if(!stripe || !elements) return
        const cardElement = elements.getElement(CardElement)
        const {error,paymentMethod} = await stripe.createPaymentMethod({type : 'card',card : cardElement})
        if(error){
            console.log('Error inside Stripe',error)
        }else{
            //Finish The Order && Capture Order
            const orderData = {
                line_items : orderSummary?.live?.line_items,
                customer: {
                   firstname: shippingData.firstName,
                    lastname:shippingData.lastName ,
                    email: shippingData.email
                  },
                  shipping: {
                    name:'International',
                    street: shippingData.address,
                    town_city: shippingData.city,
                    county_state: shippingData.subdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.country
                  }, fulfillment: {
                    shipping_method: shippingData.shippingOption
                  },payment: {
                    gateway: 'stripe',
                    stripe: {
                      payment_method_id: paymentMethod.id,
                    },
                  }
            }
            //Capture Function
            handleCaptureCheckout(orderSummary.id,orderData)
        }
    }
    return (
        <>
        {console.log('order summary checkout: ',orderSummary)}
       <Review orderSummary={orderSummary}/>
       <div className="divider"></div>
       <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({elements,stripe})=>(
                <form onSubmit={e=>submitHandler(e,elements,stripe)}>
                    <CardElement/>
                   <div className="input-field s12">
                   <button style={{width:'100%'}} type="submit" disabled={!stripe} className="btn green">Pay {orderSummary?.live?.subtotal?.formatted_with_symbol}</button>
                   </div>
                </form>
            )}
        </ElementsConsumer>
       </Elements>
        </>
    );
}
 
export default PaymentForm;