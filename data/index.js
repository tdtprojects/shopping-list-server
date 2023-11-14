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
    items: [
      {
        _id: itemIds[0],
        checked: false,
        text: "Buy a milk",
        order: 1,
      },
      {
        _id: itemIds[1],
        checked: false,
        text: "Buy a coffee",
        order: 2,
      },
      {
        _id: itemIds[2],
        checked: false,
        text: "Buy an apple",
        order: 3,
      },
    ],
  },
  {
    _id: listIds[1],
    title: "My second list",
    items: [
      {
        _id: itemIds[3],
        checked: false,
        text: "Buy rice",
        order: 1,
      },
      {
        _id: itemIds[4],
        checked: false,
        text: "Buy cake",
        order: 2
      },
    ],
  },
];
