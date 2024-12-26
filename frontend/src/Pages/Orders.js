import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import './Orders.css';
import axios from 'axios';

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
           
            allOrdersItem.push(item);
          });
        });
        console.log("All Orders Item:", allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      } else {
        console.error("Failed to load orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='P1'>
      <div className='P2'>
        <Title text1={"My"} text2={"ORDERS"} />
      </div>

      <div className='P3'>
        {orderData.slice(0, 3).map((item, index) => (
          <div key={item._id} className='P4'>
            <div className='P5'>
              <img src={item.image[0]} className='P6' alt="" />
              <div>
                <p className='P7'>{item.name}</p>
                <div className='P8'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='P10'>Date: <span className='P11'>{new Date(item.date).toDateString()}</span></p>
                <p className='P10'>Payment: <span className='P11'>{item.paymentMethod}</span></p>
                
              </div>
            </div>
            <div className='P12'>
              <div className='P13'>
                <p className='P14'></p>
                <p className='P15'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='P16'>Track order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

