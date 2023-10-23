import express from "express";
import {
  getShoppingList,
  createShoppingListItem,
  updateShoppingListItem,
  deleteShoppingListItem,
} from "../controllers/shoppingList.js";

const router = express.Router();

/* READ */
router.get("/", getShoppingList);

/* CREATE */
router.post("/", createShoppingListItem);

/* UPDATE */
router.patch("/:id", updateShoppingListItem);

/* DELETE */
router.delete("/:id", deleteShoppingListItem);

export default router;
