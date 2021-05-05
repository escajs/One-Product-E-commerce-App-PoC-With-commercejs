import './Checkout.css'
const Review = ({orderSummary}) => {
    return (
        <ul class="collection">
     {orderSummary?.live.line_items.map(item=>(
    
    <li class="collection-item avatar" key={item.id}>
      <img src={item.media.source} alt="img" class="circle"/>
      <span class="title">{item.name}</span>
      <p>Qty : {item.quantity}</p>
     <span className="secondary-content">{item.line_total.formatted_with_symbol}</span>
    </li>
     ))}
      <li class="collection-item">Subtotal : <span>{orderSummary?.live?.subtotal.formatted_with_symbol}</span></li>
     </ul>
    );
}
export default Review;