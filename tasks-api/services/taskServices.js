import knex from "knex";
import config from "../knexfile.js";
import { BINDINGS, publishToMQ } from "./mqService.js";

const TASK_STATUS = {
  todo: 0,
  done: 1
};

const db = knex(config[process.env.NODE_ENV]);

const create = async (content, user_id = 1, status = TASK_STATUS.todo) => {
  try {
    if (!content || content === "") {
      throw new Error("Invalid param");
    }
    if (!user_id || user_id === "") {
      throw new Error("Invalid param");
    }
    const createdAt = new Date();
    const createdTaskId = await db("tasks").insert({
      user_id,
      content,
      status,
      createdAt
    });
    return createdTaskId;
  } catch (error) {
    console.error(error);
    throw new Error("Can't create task");
  }
};

const readAll = async () => {
  try {
    return await db("tasks");
  } catch (error) {
    console.error(error);
    throw new Error("Can't read tasks");
  }
};

const readOne = async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid param");
    } else {
      return await db("tasks").where({ id: id }).first();
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Can't read task`);
  }
};

const updateOne = async (id, status) => {
  try {
    if (!id || status === TASK_STATUS.todo) {
      throw new Error("Invalid params");
    } else {
      const now = new Date();

      const existingTask = await readOne(id);

      if (!existingTask) {
        throw new Error(`Task does not exist`);
      }
      if (existingTask.status === TASK_STATUS.done) {
        throw new Error(`Task status is already "Done"`);
      }

      await db("tasks")
        .update({ status: TASK_STATUS.done, completedAt: now })
        .where({ id: id });

      const updatedTask = await readOne(id);
      const message = {
        message: `task ${id} has been completed at ${now}`,
        task: updatedTask
      };

      await publishToMQ(
        process.env.AMQP_URL,
        message,
        process.env.EXCHANGE,
        BINDINGS.topic,
        process.env.QUEUE,
        process.env.ROUTING_KEY
      );

      return updatedTask;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Can't update task`);
  }
};

export { create, readAll, readOne, updateOne, TASK_STATUS };
