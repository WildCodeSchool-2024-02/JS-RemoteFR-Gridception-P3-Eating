const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async browse() {
    const [rows] = await this.database.query(`
        SELECT * FROM ${this.table}`);
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM user u INNER JOIN role r ON u.role_id = r.id WHERE u.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findOneByEmail(email) {
    const [rows] = await this.database.query(
      `
      SELECT u.id, u.firstname, u.lastname, u.username, u.email, u.password,
      r.role as role
      FROM ${this.table} u
      JOIN role r
      ON u.role_id = r.id
      WHERE email = ?`,
      [email]
    );

    return rows[0];
  }

  async register(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}
      (firstname, lastname, username, email, password)
      VALUES (?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.username, user.email, user.password]
    );

    return result.insertId;
  }

  async edit(id, user) {
    const [result] = await this.database.query(
      `
      UPDATE ${this.table} SET
      firstname = ?, 
      lastname = ?, 
      username = ?, 
      email = ? 
      WHERE id = ?`,
      [user.firstname, user.lastname, user.username, user.email, id]
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
module.exports = UserRepository;
