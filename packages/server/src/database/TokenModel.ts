import mongoose, { Schema } from 'mongoose'

const TokenModel = new Schema({
  token: String,
  user_id: String,
  device: String,
  expires: String,
}, {timestamps: true});

export default mongoose.model('Token', TokenModel);