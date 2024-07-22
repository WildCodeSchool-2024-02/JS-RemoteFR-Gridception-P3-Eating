const AbstractRepository = require("./AbstractRepository");

class QuantityRepository extends AbstractRepository {
  constructor() {
    super({ table: "quantity" });
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

  async add(newQuantity) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, ingredient_id, quantity)
      VALUES (?, ?, ?)`,
      [newQuantity.recipe_id, newQuantity.id, newQuantity.quantity]
    );
    return result.insertId;
  }

  async edit(id, updatedQuantity) {
    const query = `
      UPDATE ${this.table} SET ? WHERE id = ?
    `;
    const [result] = await this.database.query(query, [updatedQuantity, id]);
    return result.affectedRows > 0;
  }

  async editByRecipeId(newQuantity, id) {
    const query = `
      UPDATE ${this.table} q
      INNER JOIN recipe r ON q.recipe_id = r.id
      SET quantity = ?
      WHERE r.id = ?
    `;
    const [result] = await this.database.query(query, [newQuantity, id]);
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
