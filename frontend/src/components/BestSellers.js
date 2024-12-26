import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import './BestSellers.css';
import ProductItem from './ProductItem';

function BestSellers() {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0,5));
  }, [products]);

  return (
    <div className='D1'>
      <div className='D2'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='D3'>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which...
        </p>
      </div>
      <div className='D4'>
        {bestseller.map((item,index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
