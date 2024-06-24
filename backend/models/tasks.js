const { Model } = require("objection");

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get relationMappings() {
    const User = require("./users");

    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "tasks.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Task;
