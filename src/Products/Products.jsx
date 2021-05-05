import Preloader from "../Preloader";
import Product from "./Product/Product";

const Products = ({products,addToCartHandler}) => {
    return (
       <main className="row container" id="products">
           <h2 className="left-align">Newset Products </h2>
           {
                /**
                 * If I don't want to check length I must Use optional chaining, it's useful
                 * when working with async functions.
                 */
           }
           {!products.length ? <Preloader/> : 
           products.map(product => (
            <Product addToCartHandler={addToCartHandler} product={product}/>
        ))
           }
       </main>
    );
}
 
export default Products;