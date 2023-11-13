import mongoose from "mongoose";

import shoppingListItem from "./ShoppingListItem.js";

const shoppingListSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: [shoppingListItem.schema],
      default: [],
    },
  },
  { timestamps: true }
);

shoppingListSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

export default ShoppingList;
