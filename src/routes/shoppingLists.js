import express from "express";

import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  unpinShoppingList,
} from "../controllers/shoppingLists.js";

const router = express.Router();

/* READ */
router.get("/", getShoppingLists);
router.get("/:id", getShoppingList);

/* CREATE */
router.post("/", createShoppingList);

// /* UPDATE */
router.put("/:id", updateShoppingList);

// /* DELETE */
router.delete("/:id", deleteShoppingList);
router.delete("/unpin/:id", unpinShoppingList);

export default router;
