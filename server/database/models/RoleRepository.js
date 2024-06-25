const AbstractRepository = require("./AbstractRepository");

class RoleRepository extends AbstractRepository {
  constructor() {
    super({ table: "role" });
  }

  async read() {
    const [rows] = await this.database.query(`
        SELECT * FROM ${this.table}`);
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async add(role) {
    const [result] = await this.database.query(
      ` INSERT INTO ${this.table} (role)
      VALUES (?)`,
      [role.role]
    );
    return result.insertId;
  }

  async edit(role) {
    // Execute the SQL UPDATE query to update a specific category
    const [result] = await this.database.query(
      `update ${this.table} set role = ? where id = ?`,
      [role.role, role.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async destroy(id) {
    // Execute the SQL DELETE query to delete a specific category
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}
module.exports = RoleRepository;
