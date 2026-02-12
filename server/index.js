import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import connectToMongoDB from "./database/db.js"
dotenv.config();


import authRouter from "./routes/auth.js"
import noteRouter from "./routes/note.js"


const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/note',noteRouter)

 connectToMongoDB();

app.listen(8080,()=>{
    console.log("server is Running");
   
})
