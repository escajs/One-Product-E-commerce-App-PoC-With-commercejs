/**
 * Developed  & Designed By : Bejja Othmane ; 5/5/2021
 * This Template Is Ideal With One Product Store And Only Contains 3 Core Sections : 
 * {Products Section (Home) , Cart Section (Customers Can Modify The Amount Or Remove 
 * The Items Or Even Empty The Cart )  And The Checkout Section }
 * N.B : This Template is Mobile-Friendly And Fully Customizable : This Means You Can Add Additional Pages With Ease.
 * Please Go To Commerce => commerce.js => Change The Key With Yours In 2nd line.
 * All Transactions used with this current version will not be charged From You Account (For Testing Only).
 */

import React,{useEffect,useState} from 'react';

import { BrowserRouter as Router,Route,Switch } from "react-router-dom";

//Importing Materiliaze Library {css}

import 'materialize-css/dist/css/materialize.min.css'

// Importing The Store Instance Provided by {commercejs}

import {commerce} from './Commerce/commerce'

//Importing Products Section

import Products from './Products/Products'

// Importing The Navbar Section

import Navbar from './Navbar/Navbar';

// Importing Cart Section

import Cart from './Cart/Cart';

// Importing Checkout Section

import Checkout from './Checkout/Checkout/Checkout';

// Importing The Slider Section {Empty initially}

import HomeSlider from './Home/HomeSlider';

// Importing The Footer Section

import Footer from './Footer/Footer';

// Importing The Thank You Message After The Customer Purchase

import ThankYouMessage from './ThankYouMessage';

const App =  () => {

  // Used To Store All Your Store Products In One Set.

  const [products,setProducts] = useState([])

  // This State Will Change Depending On Your Customers' Actions. {adding,removing,updating}

  const [cart,setCart] = useState({})

  // After The Customer Placed His Order, this state will contain all the order data, as well 
  // the customer data , it will be used within the (ThankYouMessage) component.

  const [order,setOrder] = useState({})

  // Check If Order is paid or not , if false => Customer paid successfully. 

  const [isNotPaid,setIsNotPaid] = useState(true)

  const fetchProducts = async () =>{
    /*
     * commerce.products.list() : will return to us 2 properties {meta,data}
     * We Are Interested In data (The Actual Products in our store)
     */

    const {data} = await commerce.products.list()

    /*
     * After The Fetching process is finished , save the products in products state.
     */ 

    setProducts(data)
  }

  const fetchCart = async () =>{
    /*
     * The cart is hosted in commercejs service, to transfer the cart to our website
     * we must retrieve it from there. notice the cart state is an Object unlike products state.
     * later : cart will contain cart.line_items property which is an array contains all products
     * added by user.
     */

    setCart(await commerce.cart.retrieve())

    //now we have the cart on our website, initally Empty.
  }


  const addToCartHandler = async (e,productId,qty)=>{
    /*
     * We Are Nearly Using (<a></a>) To Implement All Features, preventing the anchor
     * defualt behavior will save the user from scrolling to the top.
    */

    e.preventDefault()


    /**
     * commerce.cart.add(prodId,quantity) : All Cart methods will return to us a new cart
     * The New Cart can be the old card + the new items added ,removed or updated ...
     */

    const item = await commerce.cart.add(productId,qty)

    // You can also use : const {cart} = await commerce.cart.add(productId,qty) && setCart(cart)
  
    setCart(item.cart)
  }

  const updateCartHandler = async (e,productId,qty) =>{
    e.preventDefault()
    /**
     * commerce.cart.update(product,qty) : will allow us to increment or decreament the items amount.
     * When The amount reaches 0 it will be instantly removed from the cart.
     */

    const item = await commerce.cart.update(productId,{quantity : qty})

    setCart(item.cart)
  }

  const removeItemFromCartHandler = async (e,productId) =>{
    e.preventDefault()

    const item = await commerce.cart.remove(productId)

    setCart(item.cart)
  }

  const emptyCart = async () =>{

    // Will Be Used Inside Cart Component To Clear All Items. It will return a new empty cart.
   
    const item = await commerce.cart.empty()

    /*
     * return a new empty cart
     */

    setCart(item.cart)
  }
  const refreshCart = async () =>{
    /**
     *  Provoked After The Order Is Placed , Your Cart Will be re-usable again.
     *  You can notice it's like commerce.cart.retreive() method, it is passed directly to the cart state as an object.
     */
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }
  const handleCaptureCheckout = async (checkoutTokenId,newOrder) =>{

    try {
      /*
       * commerce.checkout.capture(checkid,orderData) will record all the user data and process the transaction,then 
       * it will send you all the info to your dashboard. 
       */

    const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)

    // If the user placed his order successfully, save his data temporary in this State
    // • With This state you can build The ThanksMessage And More.

    setOrder(incomingOrder)

    // After Getting the order data , refresh the cart and change the (isNotPaid) to false

    refreshCart()

    setIsNotPaid(false)
    } catch (error) {

      console.log('Error Occured While Placing The Order --> ',error)  

    }
  }

  useEffect(()=>{
    // ON LOAD : FETCH ALL ELEMENTS INSIDE OUR STORE && TRANSFER THE CART FROM COMMERCEJS TO OUR WEBSITE
  
    fetchProducts()

    fetchCart()

  },[])
  return (
  <Router>
    {/* 
    Render The Navbar First && Pass The total_items property to its.
    typeof(cart.total_items) // "number" [0,+00]
    */}
     <Navbar totalItems={cart.total_items}/>

    <Switch>

      <Route exact path="/">
        {/* This Slider is only a PoC to Show You How Easy You Can Integrate A New Component. */}
      <HomeSlider/>

      {/* 
      * User Can See The Products And Add Them To his Cart.
      */}

      <Products products={products} addToCartHandler={addToCartHandler}/>

      </Route>
      <Route exact path="/cart">
      <div className="container">
    <Cart 
      currentCart={cart} 
      updateCartHandler={updateCartHandler}
      removeItemFromCartHandler={removeItemFromCartHandler}
      emptyCart={emptyCart}
      />
      </div>
      </Route>
      <Route exact path="/checkout">
        <div className="container">
          {/* 
          if the cart is not empty, show the checkout component, else : 
          the cart is empty has 2 meanings : 
          1/ The user didn't add items to his cart
          2/ refreshCart() is provoked After the order is placed.
          To distinguish them we will be depending on  (isNotPaid) state.
          if the cart is empty && (isNotPaid == true) we will show the cart is empty message.
          if the cart is empty && (!isNotPaid == false => user paid) we will show thank you message and pass the order details as a props.
          ------ when To user Visits the home page again the isNotPaid state will restate to true again and so on ...
          */}
        {cart?.total_items != 0 ? <Checkout 
          cartId={cart.id} 
          order={order}
          handleCaptureCheckout={handleCaptureCheckout}
          isNotPaid={isNotPaid}
          /> : !isNotPaid ? <ThankYouMessage order={order}/> :
          <h5>Your Cart Is Empty , <a href="/">Start Shopping!</a></h5>
          }
        </div>
      </Route>
    </Switch>
    <Footer/>
  </Router>
  );
}

export default App;
