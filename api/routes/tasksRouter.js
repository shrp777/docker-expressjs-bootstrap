import express from "express";
import getTasksAction from "../actions/getTasksAction.js";
import getTaskByIdAction from "../actions/getTaskByIdAction.js";
import patchTaskAction from "../actions/patchTaskAction.js";

const router = express.Router();

router
  .route("/")
  .get(getTasksAction)
  .all((req, res, next) => next(405)); //method not allowed

router
  .route("/:id")
  .get(getTaskByIdAction)
  .patch(patchTaskAction)
  .all((req, res, next) => next(405)); //method not allowed

export default router;
