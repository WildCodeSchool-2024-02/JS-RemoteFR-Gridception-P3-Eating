const AbstractRepository = require("./AbstractRepository");

class IngredientRepository extends AbstractRepository {
  constructor() {
    super({ table: "ingredient" });
  }

  async browse() {
    const [rows] = await this.database.query(`
    SELECT * FROM ${this.table}
    `);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `
    SELECT * FROM ${this.table} WHERE id = ?
    `,
      [id]
    );
    return rows[0];
  }

  async add(newIngredient) {
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (name, calories) VALUES (?, ?)`,
      [newIngredient.name, newIngredient.calories]
    );
    return result.insertId;
  }

  async edit(id, updatedIngredient) {
    const query = `
      UPDATE ${this.table} SET ? WHERE id = ?
    `;
    const [result] = await this.database.query(query, [updatedIngredient, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const query = `
      DELETE FROM ${this.table} WHERE id = ?
    `;
    const [result] = await this.database.query(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = IngredientRepository;
