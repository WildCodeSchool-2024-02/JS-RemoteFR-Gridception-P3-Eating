const AbstractRepository = require("./AbstractRepository");

class QuantityRepository extends AbstractRepository {
  constructor() {
    super({ table: "quantity" });
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

  async readByRecipeId(id) {
    const [rows] = await this.database.query(
      `
      SELECT * FROM ${this.table} q 
      INNER JOIN recipe r ON q.recipe_id = r.id
      INNER JOIN ingredient i ON q.ingredient_id = i.id
      WHERE r.id = ?
      `,
      [id]
    );
    return rows;
  }
}

module.exports = QuantityRepository;
