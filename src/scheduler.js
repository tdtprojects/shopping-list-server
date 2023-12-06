import schedule from "node-schedule";

schedule.scheduleJob("0 0 * * *", async () => {
  // const threeMonthsAgo = new Date();
  // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  try {
    // const result = await ShoppingList.deleteMany({ updatedAt: { $lt: threeMonthsAgo } });
    const result = await ShoppingList.deleteMany({ updatedAt: { $lt: twoDaysAgo } });
    console.log(`${result.deletedCount} shopping lists deleted.`);
  } catch (error) {
    console.error("Error when deleting lists:", error);
  }
});
