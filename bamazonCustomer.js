//requirements
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//connect to SQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "",
  database: "bamazon"
});

//once connected to datgabase run show all function
connection.connect(function(err) {
  showAll();
});

// Show all items in table
function showAll() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    WhatDoYouWant(res);
  });
}

//Ask customer what they want
function WhatDoYouWant(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Insert ID of the item you want [insert 'quit' to exit]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "quit";
        }
      }
    ])
    .then(function(val) {
      checkQuit(val.input);
      var inputId = parseInt(val.choice);
      var product = DoWeHaveIt(inputId, inventory);
      if (product) {
        HowMany(product);
      } else {
        console.log("\nWe don't have that");
        showAll();
      }
    });
}

function checkQuit(choice) {
  if (choice.toLowerCase() === "quit") {
    console.log("Goodbye!");
    process.exit(0);
  }
}

function DoWeHaveIt(inputId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === inputId) {
      return inventory[i];
    }
  }
  return null;
}

function HowMany(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "Insert qualtity desired [insert 'quit' to exit]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "quit";
        }
      }
    ])
    .then(function(val) {
      checkQuit(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log("\nWe don't have enough of that");
        showAll();
      } else {
        buy(product, quantity);
      }
    });
}

function buy(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("Success!");
      showAll();
    }
  );
}
