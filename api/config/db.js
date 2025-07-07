import mongoose from "mongoose"

export const connectDB =async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB)
        console.log("Database connected successfully 😄")
        
    } catch (error) {
        console.log("Error connecting Database",error)
        process.exit(1)
        
    }
}