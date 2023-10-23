import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { shoppingList } from "./data/index.js";
import shoppingListRoutes from "./routes/shoppingList.js";
import ShoppingListItem from "./models/ShoppingListItem.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", shoppingListRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME
    // ShoppingListItem.insertMany(shoppingList);
  })
  .catch((error) => console.log(`${error} did not connect`));
