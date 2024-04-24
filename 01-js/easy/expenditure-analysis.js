/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

let transactions = [
  {
  id: 1,
  timestamp: 1656076800000,
  price: 10,
  category: 'Food',
  itemName: 'Pizza',
  },
  {
  id: 1,
  timestamp: 1656076800000,
  price: 20,
  category: 'Utilities',
  itemName: 'Wifi',
  },
  {
  id: 1,
  timestamp: 1656076800000,
  price: 10,
  category: 'Food',
  itemName: 'Pizza',
  },
  {
  id: 1,
  timestamp: 1656076800000,
  price: 10,
  category: 'Groceries',
  itemName: 'CornFlakes',
  },
  {
  id: 1,
  timestamp: 1656076800000,
  price: 10,
  category: 'Groceries',
  itemName: 'Shampoo',
  },
]

function calculateTotalSpentByCategory(transactions) {
  const totalSpentByCategory = {};
  transactions.forEach(transaction => {
    const { category, price } = transaction;
    totalSpentByCategory[category] = (totalSpentByCategory[category] || 0) + price;
  });
  console.log(totalSpentByCategory)
  return Object.entries(totalSpentByCategory).map(([category, totalSpent]) => ({ category, totalSpent }));
}

calculateTotalSpentByCategory(transactions)

module.exports = calculateTotalSpentByCategory;
