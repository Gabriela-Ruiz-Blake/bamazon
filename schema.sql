DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fargo", "Movie", 10, 100),
  ("WordTris", "Video Games", 3, 2000),
  ("Dress", "Womens Clothes", 24.50, 50),
  ("Harry Potter and the Philosophers Stone", "book", 20, 5),
  ("Harry Potter and the Chamber of Secrets", "book", 20, 5),
  ("Harry Potter and the Prisoner of Azkaban", "book", 20, 5),
  ("Harry Potter and the Goblet of Fire", "book", 20, 5),
  ("Harry Potter and the Order of the Phoenix", "book", 20, 5),
  ("Harry Potter and the Half Blood Prince", "book", 20, 5),
  ("Harry Potter and the Deathly Hallows", "book", 20, 5);

  SELECT * FROM products;