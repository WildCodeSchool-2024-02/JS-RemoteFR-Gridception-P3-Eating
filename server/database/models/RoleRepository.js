const AbstractRepository = require("./AbstractRepository");

class RoleRepository extends AbstractRepository {
  constructor() {
    super({ table: "role" });
  }

  async browse() {
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
    const [result] = await this.database.query(
      `update ${this.table} set role = ? where id = ?`,
      [role.role, role.id]
    );
    return result.affectedRows;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}
module.exports = RoleRepository;
