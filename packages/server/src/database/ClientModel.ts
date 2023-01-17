import mongoose, { Schema } from 'mongoose'

const ClientModel = new Schema({
  nome: String,
  email: String, 
  telefone: String, 
  endereco: String,
  cpf: String
}, {timestamps: true});

export default mongoose.model('Client', ClientModel);