import "./CartItem.css"
const Cartitem = ({currentCartLineItems,updateCartHandler,removeItemFromCartHandler}) => {
    return (
        <div className="col s12 m4">
             <div class="card z-depth-2 carditem" key={currentCartLineItems.id}>

        <div class="card-image">

         <img src={currentCartLineItems.media.source}/>

        <span class="card-title">{currentCartLineItems.product_name} - <small className="red" style={{padding:'0.2em'}}>{currentCartLineItems.line_total.formatted_with_symbol}</small></span>
        </div>
        <div className="card-content"></div>

<div className="card-action">

       <div className="row">
           <div className="col s6">
            <div className="row">
                <div className="col s4"><a href="#" className="btn" onClick={e=>updateCartHandler(e,currentCartLineItems.id,currentCartLineItems.quantity + 1)}>+</a></div>
                <div className="col s4 right-align" style={{paddingTop:'5px'}}>{currentCartLineItems.quantity}</div>
                <div className="col s4"><a href="#" className="btn" onClick={e=>updateCartHandler(e,currentCartLineItems.id,currentCartLineItems.quantity - 1)}>-</a></div>
            </div>
           </div>
           <div className="col s6">
               <a href="#" className="btn red right" onClick={e=>removeItemFromCartHandler(e,currentCartLineItems.id)}>remove</a>
               </div>
       </div>
    </div>

</div>
        </div>
    );
}
 
export default Cartitem;