import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import shoppingListsRoutes from "./routes/shoppingLists.js";
import { shoppingLists } from "./data/index.js";
import ShoppingList from "./models/ShoppingList.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.static("dist"));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type",
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/shopping-lists", shoppingListsRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME
    // ShoppingList.insertMany(shoppingLists);
  })
  .catch((error) => console.log(`${error} did not connect`));
