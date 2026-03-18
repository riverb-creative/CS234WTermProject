/** -----------------------
 * wishlistRouter.js
 * 
 * define the routes (method + path) the api responds to.
 */

//imports
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const wishlistController = require('../controllers/wishlistController');

//method    =   GET
//path      =   http://localhost:3000/wishlist
//response  =   full list of all items in collection
router.get("/", (request, response) => {
    wishlistController.getAllItems(request, response);
});

//method    =   GET
//path      =   http://localhost:3000/wishlist/:theCat
//response  =   item data for the document that matches the category
//router.get("/:theCat", wishlistController.getItemByCat);


//method    =   POST
//path      =   http://localhost:3000/wishlist
//response  =   add item data to collection and return success message
router.post("/", wishlistController.addItem);

//method    =   DELETE
//path      =   http://localhost:3000/wishlist/:theItemId
//response  =   remove item data from collection and return success message
router.delete("/:theItemId", (request, response) => {
    wishlistController.deleteItem(request, response)
});

//method    =   PUT
//path      =   http://localhost:3000/wishlist/:theItemId
//response  =   edit item data in collection and return success message
router.put("/:theItemId", wishlistController.editItem);

module.exports = router;