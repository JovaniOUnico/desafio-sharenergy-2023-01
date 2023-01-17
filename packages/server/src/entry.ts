import express from 'express'
import mongoose from 'mongoose'
import router from './routes'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();
const credentials = process.env.CREDENTIALS_MONGO

mongoose.connect(`mongodb+srv://${credentials}@cluster0.5jfieak.mongodb.net/?retryWrites=true&w=majority`).then(function () {
  console.log("mongo conectado")
}).catch((err) => {
  console.log('erro ao se conectar com o banco de dados do mongo', err.message)
});

const app = express();

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());
app.use(router);

app.listen(3000)