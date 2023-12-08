// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
 
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
