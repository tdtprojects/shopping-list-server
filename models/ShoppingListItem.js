import mongoose from "mongoose";

const shoppingListItemSchema = mongoose.Schema(
  {
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
