import React, { useContext } from 'react'
import "./CartTotal.css"
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

function CartTotal() {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    return (
        <div className='N1'>
            <div className='N2'>
                <Title text1={"CART"} text2={"TOTALS"} />
            </div>
            <div className='N3'>
                <div className='N4'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='N5'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                    </div>
                <hr/>
                <div className='N6'>
                    <b>Total</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>

                </div>

            </div>
        </div>
    )
}

export default CartTotal