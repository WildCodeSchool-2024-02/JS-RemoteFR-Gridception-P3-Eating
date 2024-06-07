const { readOneById } = require("../../app/controllers/usersActions");
const AbstractRepository = require("./AbstractRepository");

class UsersRepository extends AbstractRepository {
  constructor() {
    super({ table: "users" });
  }

  async read() {
    const [rows] = await this.database.query(`
        SELECT * FROM ${this.table}`);
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `
        SELECT * FROM ${this.table} WHERE ID = ?,
       
        `,
      [id]
    );
    return rows[0];
  }
}
module.exports = UsersRepository;
