import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/authRoutes.js"
import musicRouter from "./src/routes/musicRoutes.js"

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;


connectDB();

app.use("/api/auth",authRouter);
app.use("/api/music",musicRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

