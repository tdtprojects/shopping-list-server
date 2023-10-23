import mongoose from "mongoose";

const itemIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const shoppingList = [
  {
    _id: itemIds[0],
    checked: false,
    text: "Buy a milk",
  },
  {
    _id: itemIds[1],
    checked: false,
    text: "Buy a coffee",
  },
  {
    _id: itemIds[2],
    checked: false,
    text: "Buy an apple",
  },
];
