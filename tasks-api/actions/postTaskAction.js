import { create } from "../services/taskServices.js";

export default async (req, res, next) => {
  try {
    const content = req.body.content;
    const user_id = parseInt(req.body.user_id);

    //si user_id est nul ou égal 0 et/ou si status est nul ou égal 0
    if (!content || content === "" || !user_id) {
      next(400);
    } else {
      const createdTaskId = await create(content, user_id);
      res
        .location(`http://localhost:3333/tasks/${createdTaskId}`)
        .sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
