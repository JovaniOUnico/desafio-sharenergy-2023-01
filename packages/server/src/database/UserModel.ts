import mongoose, { Schema } from 'mongoose'

const UserModel = new Schema({
  name: String,
  email: String,
  password: String
}, {timestamps: true});

export default mongoose.model('User', UserModel);