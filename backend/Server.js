import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from 'mongoose';
// import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/Cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//App config
const app = express()
const port = process.env.PORT || 1200;
// connectDB()
connectCloudinary()



//mongodb
mongoose.connect("mongodb://localhost:27017/Ecommerce")
    .then(() => {
        console.log("mongodb connected successfully");
    })
    .catch(() => {
        console.log("mongodb connection error");
    })


//Middle ware

app.use(express.json())
app.use(cors())


//api endpoints
app.use('/api/user',userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
   res.send("API WORKING")
});


app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});