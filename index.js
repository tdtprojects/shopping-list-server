import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { shoppingListItems, shoppingLists } from "./data/index.js";
import shoppingListsRoutes from "./routes/shoppingLists.js";
import ShoppingList from "./models/ShoppingList.js";
import ShoppingListItem from "./models/ShoppingListItem.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/shopping-lists", shoppingListsRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME
    // ShoppingList.insertMany(shoppingLists);
    // ShoppingListItem.insertMany(shoppingListItems);
  })
  .catch((error) => console.log(`${error} did not connect`));
