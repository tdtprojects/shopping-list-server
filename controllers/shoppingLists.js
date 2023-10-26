import ShoppingList from "../models/ShoppingList.js";
import ShoppingListItem from "../models/ShoppingListItem.js";

export const getShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find();

    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* READ */
export const getShoppingList = async (req, res) => {
  try {
    const { listId } = req.params;
    const shoppingList = await ShoppingListItem.find({ listId });

    res.status(200).json(shoppingList);
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

export const createShoppingListItem = async (req, res) => {
  try {
    const { listId } = req.params;
    const { text, checked } = req.body;
    const newShoppingListItem = new ShoppingListItem({ text, checked, listId });

    await newShoppingListItem.save();

    res.status(201).json(newShoppingListItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const updateShoppingList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );

    res.status(200).json(updatedShoppingList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateShoppingListItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, checked } = req.body;
    const updatedShoppingListItem = await ShoppingListItem.findByIdAndUpdate(
      id,
      { text, checked },
      { new: true }
    );

    res.status(200).json(updatedShoppingListItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* DELETE */
export const deleteShoppingList = async (req, res) => {
  try {
    const { listId } = req.params;
    const shoppingList = await ShoppingList.findByIdAndDelete(listId);

    if (!shoppingList) {
      res.status(404).json({ message: "Shopping list not found." });

      return;
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteShoppingListItem = async (req, res) => {
  try {
    const { id } = req.params;
    const shoppingListItem = await ShoppingListItem.findByIdAndDelete(id);

    if (!shoppingListItem) {
      res.status(404).json({ message: "Shopping list item not found." });

      return;
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
