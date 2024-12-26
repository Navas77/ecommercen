import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import './Cart.css'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
function Cart() {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);

    }


  }, [cartItems, products])

  return (
    <div className='M1'>
      <div className='M2'>
        <Title text1={"YOUR"} text2={"CART"} />
        <div>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (

                <div key={index} className='M3'>
                  <div className='M4'>
                    <img src={productData.image[0]} className='M5' alt=" " />
                    <div>
                      <p className='M6'>{productData.name}</p>
                      <div className='M7'>
                        <p>{currency}{productData.price}</p>
                        <p className='M8'>{item.size}</p>

                      </div>
                    </div>

                  </div>
                  <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='M9' type='number' min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='M10' alt="" />
                </div>
              )
            })
          }
        </div>
        <div className='M12'>
          <div className='M13'>
            <CartTotal />
            <div className='M14'>
              <button onClick={() => navigate("/place-order")} className='M15' >PROCEED TO CHECK OUT</button>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart