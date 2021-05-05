import React, { useRef, useEffect } from 'react';
import "./Home.css"
import M from 'materialize-css'
const HomeSlider = () => {
    const carousel = useRef()
    useEffect(()=>{
       // M.Carousel.init(carousel.current,{indicators:true,fullWidth:true})
       var elems = document.querySelectorAll('.carousel');
       var instances = M.Carousel.init(elems, {indicators:true,fullWidth:true});
    },[])
    return (
       <>
      <div class="carousel carousel-slider z-depth-2" ref={carousel}>
      <div class="carousel-fixed-item center">
      <a class="btn waves-effect white grey-text darken-text-2" href="#products">Start Shopping</a>
    </div>
    <a class="carousel-item" href="#random_prod1"><img src="https://cdn.pixabay.com/photo/2021/04/18/13/35/flowers-6188414_960_720.jpg"/></a>
    <a class="carousel-item" href="#random_prod2"><img src="https://cdn.pixabay.com/photo/2020/07/06/01/33/sky-5375005_960_720.jpg"/></a>
  </div>
       </>
    );
}
 
export default HomeSlider;