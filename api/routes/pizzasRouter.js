import express from "express";

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    res.json([]);
  }) //call getPizzasAction method and transmit req, res, next argument
  .all((req, res, next) => next(405)); //method not allowed

export default router;
