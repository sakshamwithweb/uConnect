import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: Number,
    expireAt: { type: Date, expires: 60 }
})

const Otp = mongoose.models.otps || mongoose.model('otps', otpSchema)
export default Otp