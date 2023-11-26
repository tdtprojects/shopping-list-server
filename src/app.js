import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { shoppingLists } from "./data/index.js";
import shoppingListsRoutes from "./routes/shoppingLists.js";
import ShoppingList from "./models/ShoppingList.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.static("dist"));
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.get("origin");
  console.log("Request Origin:", origin);
  next();
});
app.use(
  cors({
    origin: ["http://localhost:8080", "https://shopping-list-web-app.pages.dev"],
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type",
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/shopping-lists", shoppingListsRoutes);

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
