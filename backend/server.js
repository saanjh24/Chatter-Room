import express  from "express";
import cookieParser from "cookie-parser";
import  dotenv from  "dotenv";



import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);




app.listen(PORT, () => {
	connectToMongoDB();
	console.log("server is running fuck");
});
