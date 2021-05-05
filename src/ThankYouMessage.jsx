const ThankYouMessage = ({order}) => {
    return (
        <div className="row container">
    <h3>Hey {order.customer.firstname},</h3>
      <h5>Thank you for your purchase!</h5>
   <h5>As soon as your package is shipped, we will notify you via an email.</h5>
   <h6> If you have any questions, please let us know. We'll get back
    to you as soon as we can.</h6>
        </div>
    );
}
 
export default ThankYouMessage