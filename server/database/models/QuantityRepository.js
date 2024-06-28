const AbstractRepository = require("./AbstractRepository");

class QuantityRepository extends AbstractRepository {
  constructor() {
    super({ table: "quantity" });
  }

  async browse() {
    const [rows] = await this.database.query(`
      SELECT q.*, r.title AS recipe_title, i.name AS ingredient_name
      FROM ${this.table} AS q
      INNER JOIN recipe AS r ON q.recipe_id = r.id
      INNER JOIN ingredient AS i ON q.ingredient_id = i.id
    `);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `
        SELECT q.*, r.title AS recipe_title, i.name AS ingredient_name
        FROM ${this.table} AS q
        INNER JOIN recipe AS r ON q.recipe_id = r.id
        INNER JOIN ingredient AS i ON q.ingredient_id = i.id
        WHERE q.id = ?
      `,
      [id]
    );
    return rows[0];
  }

  async add(newQuantity) {
    const query = `
      INSERT INTO ${this.table} SET ?
    `;
    const [result] = await this.database.query(query, newQuantity);
    return result.insertId;
  }

  async edit(id, updatedQuantity) {
    const query = `
      UPDATE ${this.table} SET ? WHERE id = ?
    `;
    const [result] = await this.database.query(query, [updatedQuantity, id]);
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

module.exports = QuantityRepository;
