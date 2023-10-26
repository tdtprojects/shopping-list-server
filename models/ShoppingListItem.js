import mongoose from "mongoose";

const shoppingListItemSchema = mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const ShoppingListItem = mongoose.model("ShoppingListItem", shoppingListItemSchema);

export default ShoppingListItem;
