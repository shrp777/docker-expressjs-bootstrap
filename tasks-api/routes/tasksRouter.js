import express from "express";
import getTasksAction from "../actions/getTasksAction.js";
import getTaskByIdAction from "../actions/getTaskByIdAction.js";
import patchTaskAction from "../actions/patchTaskAction.js";
import postTaskAction from "../actions/postTaskAction.js";

const router = express.Router();

router
  .route("/")
  .post(postTaskAction)
  .get(getTasksAction)
  .all((req, res, next) => next(405)); //method not allowed

router
  .route("/:id")
  .get(getTaskByIdAction)
  .patch(patchTaskAction)
  .all((req, res, next) => next(405)); //method not allowed

export default router;
