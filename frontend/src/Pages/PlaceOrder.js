import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'




function PlaceOrder() {

  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
       const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID ,
        amount:order.amount,
        currency:order.currency,
        name:"Order Payment",
        description:"order payment",
        order_id:order.id,
        receipt:order.receipt,
        handler: async (response) => {
          console.log(response);
          try {
            const {data} = await axios.post(`${backendUrl}/api/order/verifyRazorpay`,response,{headers:{token}})
            if(data.success){
              navigate('/orders')
                setCartItems({})
              
            }
          } catch (error) {
            console.log(error);
            toast.error(error)
            
          }
          
        }
       }
       const rzp = new window.Razorpay(options)
       rzp.open()
  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee

      }
      switch (method) {
        //api calls for cod
        case "cod": 
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
        
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

          // case"stripe":
          
          //const responseStripe = await axios.post(`backendUrl/api/order/stripe`,orderData,{headers:{token}})
          //if(responseStripe.data.success){
            // const {session_url} = responseStripe.data
            // window.location.replace(session_url)
           
          //} //else{
          // }toast.error(resonseStripe.data.message)
          //}
          // break;

          // case 'razorpay' :
             
          // const responseRazorpay = await axios.post(`backendUrl/api/order/razorpay`,orderData,{headers:{token}})
          // if(responseRazorpay.data.success){

          //   console.log(responseRazorpay.data.order);
            
          //   // const {session_url} = responseRazorpay.data
          // }

          // break;

          case 'razorpay':
             const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: {token} } );
              if (responseRazorpay.data.success) {
                  console.log(responseRazorpay.data.order);
                
                  initPay(responseRazorpay.data.order)
                   // Implement Razorpay payment gateway flow here
                    } 
                    // else { toast.error(responseRazorpay.data.message); }
                     break;



        default:
          break;
      }
    } catch (error) {
      console.log(error);

      
      toast.error("An error occurred while placing the order.",error.message);
    }
  };




return (
  <form onSubmit={onSubmitHandler} className='O1'>
    {/*--------Left side------------ */}
    <div className='O2'>
      <div className='O3'>
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />

      </div>
      <div className='O4'>
        <input required onChange={onChangeHandler} value={FormData.firstName} name='firstName' id='' className='O5' type='text ' placeholder='First name' />
        <input required onChange={onChangeHandler} value={FormData.lastNamet} name='lastName' className='O5' type='text ' id='' placeholder='Last name' />


      </div>
      <input required onChange={onChangeHandler} value={FormData.email} name='email' className='O5' type="email" id='' placeholder='Email Address' />
      <input required onChange={onChangeHandler} value={FormData.street} name='street' className='O5' type='text ' id='' placeholder='Street' />
      <div className='O4'>
        <input required onChange={onChangeHandler} value={FormData.city} name=' city' className='O5' type='text ' id='' placeholder='City' />
        <input required onChange={onChangeHandler} value={FormData.state} name='state' className='O5' type='text ' id='' placeholder='State' />

      </div>
      <div className='O4'>
        <input required onChange={onChangeHandler} value={FormData.zipcode} name='zipcode' className='O5' type='number ' id='' placeholder='Zip code' />
        <input required onChange={onChangeHandler} value={FormData.country} name='country' className='O5' type='text ' id='' placeholder='Country' />

      </div>
      <input required onChange={onChangeHandler} value={FormData.phone} name='phone' className='O5' type='number ' id='' placeholder='Phone' />
    </div>
    {/*--------------------Right side------------------- */}
    <div className='O6'>
      <div className='O7'>
        <CartTotal />
      </div>
      <div className='O8'>
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        {/*----------------payment Method selection------------ */}
        <div className='O9'>
          <div onClick={() => setMethod("stripe")} className='O10'>
            <p className={`O11 ${method === "stripe" ? "bg-green" : " "} `}></p>
            <img src={assets.stripe_logo} className='O12' alt='' />
          </div>
          <div onClick={() => setMethod("razorpay")} className='O10'>
            <p className={`O11 ${method === "razorpay" ? "bg-green" : " "} `}></p>
            <img src={assets.razorpay_logo} className='O12' alt='' />
          </div>
          <div onClick={() => setMethod("cod")} className='O10'>
            <p className={`O11 ${method === "cod" ? "bg-green" : " "} `}></p>
            <p className='O13'>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className='O14'>
          <button type='submit' className='O15'>PLACE ORDER</button>
        </div>
      </div>
    </div>
  </form>
)
}

export default PlaceOrder
