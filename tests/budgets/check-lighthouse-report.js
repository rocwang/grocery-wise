// Check Lighthouse report with pre-defined scores and budgets
const fs = require("fs");

const scoreThreshold = require("./score");

// load report file path from command argument
const report = JSON.parse(fs.readFileSync(process.argv[2]).toString("utf8"));

const categories = Object.values(report.categories);
const performanceBudgetItems =
  report.audits["performance-budget"].details.items;

// Show the scores
categories.forEach(({ title, score }) => {
  console.log(`${title}: ${score * 100}`);
});

// Check the scores thresholds are met
const isScorePassed = categories.every(
  ({ score, id }) => score * 100 >= scoreThreshold[id]
);

// Show the performance budget audit
console.log(JSON.stringify(performanceBudgetItems, null, 2));

// Check the performance budget is met
const isUnderBudget = performanceBudgetItems.every(
  item => !("sizeOverBudget" in item) && !("countOverBudget" in item)
);

process.exitCode = isScorePassed && isUnderBudget ? 0 : 1;
