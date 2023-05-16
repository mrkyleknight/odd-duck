'use strict';


function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
}

// Create three unique product objects
var product1 = new Product("Product 1", "img/bag.jpg");
var product2 = new Product("Product 2", "img/banana.jpg");
var product3 = new Product("Product 3", "img/boots.jpg");


// Get references to the HTML elements where the images will be displayed
var imageContainer = document.getElementById("image-container");
var productImages = document.getElementsByClassName("product-image");

// Create an array to hold the product objects
var products = [product1, product2, product3];

// Function to display a random product image
function displayRandomProduct() {
  // Generate a random index to select a product from the array
  var randomIndex = Math.floor(Math.random() * products.length);
  
  // Get the selected product object
  var selectedProduct = products[randomIndex];
  
  // Increment the timesShown property of the selected product
  selectedProduct.timesShown++;
  
  // Display the selected product image
  var imageElement = productImages[randomIndex];
  imageContainer.appendChild(imageElement);
}

// Call the displayRandomProduct function to show a random product image
displayRandomProduct();

