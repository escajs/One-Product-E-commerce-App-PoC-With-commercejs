import React,{useRef} from 'react';
import './product.css'
const Product = ({product,addToCartHandler}) => {
  const addTo = useRef()
  const pulseHandlerAdd = () => addTo.current.classList.add('pulse')
  const pulseHandlerRemove = () => addTo.current.classList.remove('pulse')
    return (
        <div class="col s12 m6 l4">

      <div class="card z-depth-2" key={product.id}>

        <div class="card-image">

          <img src={product.media.source}/>

          <span class="card-title">{product.name} -<br/><small class="red" style={{padding:'.3em'}}>{product.price.formatted_with_symbol}</small></span>

          <a class="btn-floating halfway-fab waves-effect waves-light teal" onMouseLeave={pulseHandlerRemove} onMouseEnter={pulseHandlerAdd} ref={addTo} onClick={e=>addToCartHandler(e,product.id,1)}><i class="material-icons tiny">add_shopping_cart</i></a>
       
        </div>
        <div class="card-content">

          <p>{product.description.substring(3,product.description.length - 4)}</p>

        </div>

      </div>

    </div>
    );
}
 
export default Product;