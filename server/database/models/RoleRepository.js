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
}
module.exports = RoleRepository;
