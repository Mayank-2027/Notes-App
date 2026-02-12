import mongoose from "mongoose";


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL);

    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.log("MongoDB Connection Failed ❌");
    console.log(error.message);
  }
};

export default connectToMongoDB;
