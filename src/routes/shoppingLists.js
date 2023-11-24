import express from "express";

import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingListItems,
  deleteShoppingList,
  unpinShoppingList,
  updateShoppingListTitle,
} from "../controllers/shoppingLists.js";

const router = express.Router();

/* READ */
router.get("/", getShoppingLists);
router.get("/:id", getShoppingList);

/* CREATE */
router.post("/", createShoppingList);

// /* UPDATE */
router.put("/:id", updateShoppingListItems);
router.put("/:id/title", updateShoppingListTitle);

// /* DELETE */
router.delete("/:id", deleteShoppingList);
router.delete("/unpin/:id", unpinShoppingList);

export default router;
