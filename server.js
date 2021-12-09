import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './src/routes.js'
dotenv.config()

const server = express();

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(fileUpload())
server.use(express.static("./public"))

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log('Erro:', error.message)
})

server.use('/', routes)

server.listen(process.env.PORT, ()=> {
    console.log(`-- Servidor rodando no endereço: ${process.env.BASE}`)
})