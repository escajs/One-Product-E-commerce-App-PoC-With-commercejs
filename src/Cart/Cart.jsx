import React,{ useState,useEffect } from "react";
import Preloader from "../Preloader";
import Cartitem from "./CartItem/CartItem";

const Cart = ({currentCart,updateCartHandler,removeItemFromCartHandler,emptyCart}) => {

    const [windowWidth,setWindowWidth] = useState(1300)

    const EmptyCartComponent = () => (
        <>
        <h5>Your Cart Is Empty , <a href="/">Start Shopping!</a></h5>
        </>
    )

    const Cart = _ => (
        <>

        <section className="row">

        <h3 className="left-align">Your Cart Content</h3>

          {currentCart.line_items.map(item=>(

              <Cartitem 
              updateCartHandler={updateCartHandler} 
              removeItemFromCartHandler ={removeItemFromCartHandler} 
              currentCartLineItems={item}
               />

          ))}
      </section>

     <div className="row">

         <div className="col s12 m6">

         <h3 style={{marginTop:'0px'}}>Subtotal : {currentCart.subtotal.formatted_with_symbol}</h3>
        
         </div>
         <div className="col s12 m6">

             <div className={windowWidth > 600 ? 'row right' : 'row'}>

                 <div className="col s6">
              
                 <a href="/checkout" className={windowWidth <= 600 ? 'btn-large blue left' : 'btn-large blue right'}>Checkout</a>
            
                 </div>
               
                 <div className="col s6">
             
                 <a href="#" onClick={e=>emptyCart(e,currentCart.id)} className={windowWidth <= 600 ? 'btn-large red right' : 'btn-large red right'}>Empty</a>
            
                 </div>
           
             </div>
         
         </div>
     </div>
       </>
    )
    useEffect(()=>{
        const updateWindowWidth = () =>{

            const newWidth = window.innerWidth

            setWindowWidth(newWidth)

        }
        window.addEventListener('resize',updateWindowWidth)
    },[])
    return (
        <>
        {/* 
        * if currentCart.line_items are not loaded yet : show the Preloader
        * else && no added items => show the EmptyCart component
        * else && >= 1 item is added => show the cart
        */}
       {!currentCart.line_items ? <Preloader/> : currentCart.line_items.length == 0 ? <EmptyCartComponent/> : <Cart/>}
       </>
    );
}
 
export default Cart;
