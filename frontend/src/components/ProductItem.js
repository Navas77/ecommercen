import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import './ProductItem.css'


function ProductItem({id,image,name,price}) {

  const {currency} = useContext(ShopContext)



  return (
    <Link className='C1' to={`/product/${id}`}>
  <div className='C2'>
    <img src={image[0]} className='C3' alt=""/>
</div>
<p className='C4'>{name}</p>
<p className='C5'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem