import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay"

const app = express();

app.use(cors({
origin: [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://[::1]:5173",
  "http://localhost",
  "http://127.0.0.1",
  "http://[::1]",
  "http://10.243.104.205:5173",
  "http://10.102.234.81:5173"
],
credentials: true
}));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Health check route
app.get("/", (req, res) => {
    res.json({ status: "OK", message: "E-Learning Platform API is running", timestamp: new Date().toISOString() });
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy", service: "e-learning-backend" });
});


export const instance = process.env.KEY_ID && process.env.KEY_SECRET 
    ? new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
      })
    : null

//student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter)


//teacher routes
import teacherRouter from "./routes/teacher.routes.js"
app.use("/api/teacher", teacherRouter)

//course routes
import courseRouter from "./routes/course.routes.js"
app.use("/api/course", courseRouter)

import adminRouter from "./routes/admin.routes.js"
app.use("/api/admin", adminRouter)

import paymentRouter from "./routes/payment.routes.js"
app.use("/api/payment", paymentRouter)


export {app}