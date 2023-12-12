import schedule from "node-schedule";

import ShoppingList from "./models/ShoppingList.js";

schedule.scheduleJob("0 0 * * *", async () => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    const result = await ShoppingList.deleteMany({ updatedAt: { $lt: threeMonthsAgo } });

    console.log(`${result.deletedCount} shopping lists deleted.`);
  } catch (error) {
    console.error("Error when deleting lists:", error);
  }
});
