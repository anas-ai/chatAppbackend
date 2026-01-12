// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.routes.js";
// import { initializeSocket } from "./socket/socket.js";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// // mount to /api/auth
// app.use('/api/auth', authRoutes);

// app.get("/", (req, res) => {
//   res.send("server is running");
// });

// const PORT = process.env.PORT || "0.0.0.0";

// const server = http.createServer(app);
// // listen to socket  events
// initializeSocket(server)

// connectDB().then(() => {
//   console.log("db connected");
//   server.listen(PORT, () => {
//     console.log("Server is running on port ", PORT);
//   });

  
// }).catch((error) => {
//   console.log("Failed to start server due to database connection error:", error);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

// ❌ app.listen mat likho
export default app;
