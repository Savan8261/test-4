/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // await knex.raw('TRUNCATE TABLE "tasks" ');
  // await knex.raw('TRUNCATE TABLE "users" ');

  await knex("users").insert([
    { id: 1, role: "admin", username: "admin", password: "admin1234" },
    { id: 2, role: "user", username: "user1", password: "user12345" },
    { id: 3, role: "user", username: "user2", password: "user23456" },
  ]);

  await knex("tasks").insert([
    {
      id: 1,
      task: "task1",
      description: "description1",
      startDate: "2024-06-10",
      dueDate: "2024-06-20",
      userId: 3,
      status: "pending",
    },
    {
      id: 2,
      task: "task2",
      description: "description2",
      startDate: "2024-06-11",
      dueDate: "2024-06-21",
      userId: 2,
      status: "pending",
    },
    {
      id: 3,
      task: "task3",
      description: "description3",
      startDate: "2024-06-12",
      dueDate: "2024-06-22",
      userId: 1,
      status: "pending",
    },
  ]);
};
