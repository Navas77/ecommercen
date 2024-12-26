import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    address:{type:Object,default:{line1:"",line2:""}},
    phone:{type:Number,default:"0000000000"}
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel