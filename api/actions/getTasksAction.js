import { readAll } from "../services/taskServices.js";

export default async (req, res, next) => {
  try {
    const tasks = await readAll();

    if (!tasks) {
      next(500);
    } else {
      res.json(tasks);
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
