import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  "username": {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  "email": {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  "password": {
    type: String,
    required: true,
    minlength: 8
  },
  "updatedAt": {
    type: Date
  },
  "createdAt": {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User