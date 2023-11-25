import ShoppingList from "../models/ShoppingList.js";
import { getCookieConfig } from "../utils/getCookieConfig.js";

/* READ */
export const getShoppingLists = async (req, res) => {
  try {
    let shoppingLists = [];

    if (req.cookies.sll?.length) {
      const shoppingListsIds = req.cookies.sll
        .split(";=")
        .map((item) => Buffer.from(item, "base64").toString("utf-8"))
        .filter((item) => item.length > 0);

      shoppingLists = await ShoppingList.find({
        _id: {
          $in: shoppingListsIds,
        },
      });
    }

    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const encodedId = Buffer.from(id).toString("base64");

    if (!req.cookies.sll?.includes(encodedId)) {
      const shoppingListsEncodedIds = req.cookies.sll?.length
        ? req.cookies.sll + `;=${encodedId}`
        : encodedId;

      res.cookie("sll", shoppingListsEncodedIds, getCookieConfig());
    }

    const shoppingList = await ShoppingList.findById(id);

    if (shoppingList) {
      res.status(200).json(shoppingList);
    } else {
      res.status(404).json({ message: "Shopping list not found." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* CREATE */
export const createShoppingList = async (req, res) => {
  try {
    const { title } = req.body;
    const newShoppingList = new ShoppingList({ title });

    await newShoppingList.save();

    res.status(201).json(newShoppingList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const updateShoppingListItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const updatedItems = items.map(({ id, ...rest }) => ({ ...rest }));
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      { items: updatedItems },
      { new: true }
    );

    if (updatedShoppingList) {
      res.status(200).json(updatedShoppingList);
    } else {
      res.status(404).json({ message: "Shopping list not found." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateShoppingListTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(id, { title }, { new: true });

    if (updatedShoppingList) {
      res.status(200).json(updatedShoppingList);
    } else {
      res.status(404).json({ message: "Shopping list not found." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* DELETE */
export const deleteShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const shoppingList = await ShoppingList.findByIdAndDelete(id);

    if (!shoppingList) {
      res.status(404).json({ message: "Shopping list not found." });

      return;
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unpinShoppingList = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.cookies.sll?.length) {
      const encodedId = Buffer.from(id).toString("base64");
      let stringToReplace = "";

      if (req.cookies.sll.length > encodedId.length) {
        stringToReplace = req.cookies.sll.startsWith(encodedId) ? encodedId : `;=${encodedId}`;
      } else {
        stringToReplace = encodedId;
      }

      const updatedSll = req.cookies.sll.replace(stringToReplace, "");

      res.cookie("sll", updatedSll, getCookieConfig());
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
