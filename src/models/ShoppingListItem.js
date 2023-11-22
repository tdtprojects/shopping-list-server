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
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

shoppingListItemSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

const ShoppingListItem = mongoose.model("ShoppingListItem", shoppingListItemSchema);

export default ShoppingListItem;
