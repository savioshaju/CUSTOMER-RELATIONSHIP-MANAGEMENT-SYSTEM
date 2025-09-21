import express from 'express';
import dotenv from 'dotenv'
import { connectDatabase } from './config/connectdb.js';
import { statusCodes } from './helpers/userHelper.js';
import  userRoutes from "./app/routes/userRoutes.js"
import caseRoutes from "./app/routes/caseRoutes.js"
import customerRoutes from "./app/routes/customerRoutes.js"
dotenv.config()
connectDatabase();


const app = express()

app.use(express.json())


app.get("/", (req, res) => res.send("Inventory API is Running"))

app.get("/health", (req,res) => {
    const status = statusCodes.find(item => item.code === 200);
    res.status(status.code).json({ success: true, message: status.message + " Server is running" });
})

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use("/api/user", userRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/customers", customerRoutes);


app.use((req, res) => {
  const status = statusCodes.find(item => item.code === 404);
  res.status(status.code).json({ success: false, message: "URL " + req.originalUrl + " " + status.message });
});


app.listen(3000, () => {
    console.log("Server running at port 3000")
})