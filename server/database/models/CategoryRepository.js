const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "category" });
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

  async add(newCategory) {
    const query = `
      INSERT INTO ${this.table} SET ?
    `;
    const [result] = await this.database.query(query, newCategory);
    return result.insertId;
  }

  async edit(id, updatedCategory) {
    const query = `
      UPDATE ${this.table} SET ? WHERE id = ?
    `;
    const [result] = await this.database.query(query, [updatedCategory, id]);
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

module.exports = CategoryRepository;

