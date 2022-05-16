import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use('/api/products',productRoutes)

app.get('/',(req,res)=>{
    res.send("API is running...")
})



const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.white.bgYellow))