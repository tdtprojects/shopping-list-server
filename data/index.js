import mongoose from "mongoose";

const listIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

const itemIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const shoppingLists = [
  {
    _id: listIds[0],
    title: "My first list",
  },
  {
    _id: listIds[1],
    title: "My second list",
  },
];

export const shoppingListItems = [
  {
    _id: itemIds[0],
    listId: listIds[0],
    checked: false,
    text: "Buy a milk",
  },
  {
    _id: itemIds[1],
    listId: listIds[0],
    checked: false,
    text: "Buy a coffee",
  },
  {
    _id: itemIds[2],
    listId: listIds[0],
    checked: false,
    text: "Buy an apple",
  },
  {
    _id: itemIds[3],
    listId: listIds[1],
    checked: false,
    text: "Buy rice",
  },
  {
    _id: itemIds[4],
    listId: listIds[1],
    checked: false,
    text: "Buy cake",
  },
];
