import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Route Imports
import userRoutes from "./routes/userRoutes.js";
import faqsRoutes from "./routes/faqsRoutes.js";
import lotteryRoutes from "./routes/lotteryRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import seoRoutes from "./routes/seoRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js";
import prizeBreakdown from "./routes/prizeBreakRoute.js";
import Jackpotroutes from "./routes/jackpotRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/lotteries", lotteryRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/prize-breakdowns", prizeBreakdown);
app.use("/api/jackpot", Jackpotroutes);
app.use("/api/seo", seoRoutes);
app.use("/api/subscriber", subscriptionRoutes);
app.use("/api/winners", winnerRoutes);

// Root Route
app.get("/", (req, res) => res.send("🎯 Lottery System Backend is running..."));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
