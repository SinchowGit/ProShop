import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${(await conn).connection.host}`.green.bold.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.white.bgRed)
        process.exit(1)
    }
}

export default connectDB