import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import './LatestCollection.css'
import ProductItem from './ProductItem';


function LatestCollection() {

    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([])
    
    useEffect (()=>{
setLatestProducts(products.slice(0,10));
    },[products])
  return ( 
    <div className='B1'>
      <div className='B2'>
      <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
      <p className='B3'> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which </p>

      </div>
      {/* Rendering Products*/}
      <div className='B4'>
        {
          latestProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }

      </div>
    </div>
  )
}

export default LatestCollection