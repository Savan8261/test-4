const { knexSnakeCaseMappers } = require("objection");

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: "test_4_backend",
      user: "root",
      password: "techuz123",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    ...knexSnakeCaseMappers(),
  },
};
