import { readOne } from "../services/taskServices.js";

export default async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      next(400);
    } else {
      const task = await readOne(id);

      if (!task) {
        next(404);
      } else {
        res.json(task);
      }
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
