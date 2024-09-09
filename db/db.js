import mongoose from "mongoose";

/* Database Connection  */
export default async function connectDB(mongodb_url) {
  try {
    const conn = await mongoose.connect(mongodb_url);
    console.log(`MongoDB connected !! DB HOST: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection error : ${error}`);
    process.exit(1);
  }
}
