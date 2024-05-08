import mongoose from "mongoose";

const connectDB=async ()=>{
  try{
   const conn=await mongoose.connect(process.env.MONGO_URL)
   console.log(
    `Connected to the database ${conn.connection.host}`
   )
  }
  catch(error){
    console.log(`error in mongodb is ${error}`)
  }
}
export default connectDB;