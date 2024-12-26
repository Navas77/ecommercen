import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import './RelatedProducts.css'
import ProductItem from '../components/ProductItem'




function RelatedProducts({category, subCategory}) {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (products.length > 0) {

            let productsCopy = products.slice();
            
            

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            console.log("Filtered products before setting state:", productsCopy.slice(0,5));
            setRelated(productsCopy.slice(0,5));
          
            


        }

    }, [products])
   
    return (
        <div className='L1'>
          <div className='L2'>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>

          </div>
          <div className='L3'>
            {related.map((item,index)=>(
               <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))}

          </div>
        </div>
    )
}

export default RelatedProducts