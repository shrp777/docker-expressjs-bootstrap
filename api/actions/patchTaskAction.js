import { updateOne } from "../services/taskServices.js";

export default async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const status = parseInt(req.body.status);

    if (!id || !status) {
      next(400);
    } else {
      await updateOne(id, status);
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
