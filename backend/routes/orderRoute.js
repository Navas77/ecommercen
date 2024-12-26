import express from  "express"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"
import {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyRazorpay, updateAddress} from "../controllers/orderController.js"

const orderRouter = express.Router()

//admin Features

orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)


//payment Features
orderRouter.post("/place",authUser,placeOrder)
// orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)


//user Feature
orderRouter.post("/userorders",authUser,userOrders)

//verify payment
//orderRouter.post("/verifyStripe",authUser,verifyStripe)
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

orderRouter.put('/updateAddress/:orderId', updateAddress);


export default orderRouter





