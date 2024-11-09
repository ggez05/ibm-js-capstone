/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

// Search for gifts
router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("gifts");

    const query = {};

    if (req.query.name && req.query.name.trim() !== "") {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    // Task 3: Add other filters to the query
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.condition) {
      query.condition = req.query.condition;
    }
    if (req.query.age_years) {
      query.age_years = { $lte: parseInt(req.query.age_years) };
    }

    const gifts = await collection.find(query).toArray();

    res.json(gifts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;