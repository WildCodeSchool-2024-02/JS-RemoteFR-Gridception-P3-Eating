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
