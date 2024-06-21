const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe" });
  }

  async read() {
    const [rows] = await this.database.query(`
        SELECT * FROM ${this.table}
        `);
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `
        SELECT * FROM ${this.table} WHERE id = ?
        `,
      [id]
    );
    return rows[0];
  }
}

module.exports = RecipeRepository;
