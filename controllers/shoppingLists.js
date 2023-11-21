import ShoppingList from "../models/ShoppingList.js";

/* READ */
export const getShoppingLists = async (req, res) => {
  try {
    let shoppingLists = [];

    if (req.cookies.sll?.length) {
      const shoppingListsIds = req.cookies.sll
        .split(";=")
        .map((item) => Buffer.from(item, "base64").toString("utf-8"));

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

      res.cookie("sll", shoppingListsEncodedIds, {
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        httpOnly: true, // HTTP only flag
        secure: true, // Set to true if your application is using HTTPS
        sameSite: "None", // Allow cross-site requests
      });
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
export const updateShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, items } = req.body;
    const updatedItems = items.map(({ id, ...rest }) => ({...rest}));
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      { title, items: updatedItems },
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
      const stringToReplace =
        req.cookies.sll.length > encodedId.length ? `;=${encodedId}` : encodedId;
      const updatedSll = req.cookies.sll.replace(stringToReplace, "");

      res.cookie("sll", updatedSll, {
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        httpOnly: true, // HTTP only flag
        secure: true, // Set to true if your application is using HTTPS
        sameSite: "None", // Allow cross-site requests
      });
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
