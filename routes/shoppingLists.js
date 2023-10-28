import express from "express";

import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  createShoppingListItem,
  updateShoppingList,
  updateShoppingListItem,
  deleteShoppingList,
  deleteShoppingListItem,
  unpinShoppingList,
} from "../controllers/shoppingLists.js";

const router = express.Router();

/* READ */
router.get("/", getShoppingLists);
router.get("/:listId", getShoppingList);

/* CREATE */
router.post("/", createShoppingList);
router.post("/:listId", createShoppingListItem);

// /* UPDATE */
router.patch("/:listId", updateShoppingList);
router.patch("/:listId/:id", updateShoppingListItem);

// /* DELETE */
router.delete("/:listId", deleteShoppingList);
router.delete("/:listId/:id", deleteShoppingListItem);
router.delete("/unpin/:listId", unpinShoppingList);

export default router;
