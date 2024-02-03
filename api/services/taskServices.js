import knex from "knex";
import config from "../knexfile.js";
import { BINDINGS, publishToMQ } from "./mqService.js";

const db = knex(config[process.env.NODE_ENV]);

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
    throw new Error(`Can't read task ${id}`);
  }
};

const updateOne = async (id, status) => {
  try {
    if (!id || !status) {
      throw new Error("Invalid params");
    } else {
      const now = new Date();

      await db("tasks")
        .update({ status: status, completedAt: now })
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
    throw new Error(`Can't update task ${id}`);
  }
};

export { readAll, readOne, updateOne };
