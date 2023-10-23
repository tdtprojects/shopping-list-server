import ShoppingListItem from "../models/ShoppingListItem.js";

/* READ */
export const getShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingListItem.find();

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* CREATE */
export const createShoppingListItem = async (req, res) => {
  try {
    const { text, checked } = req.body;
    const newShoppingListItem = new ShoppingListItem({ text, checked });

    await newShoppingListItem.save();

    const shoppingList = await ShoppingListItem.find();

    res.status(201).json(shoppingList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
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
