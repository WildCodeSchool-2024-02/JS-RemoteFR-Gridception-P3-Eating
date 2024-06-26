const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    super({ table: "favorite" });
  }

  async read() {
    const [rows] = await this.database.query("SELECT * FROM favorite");
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      "SELECT * FROM favorite WHERE user_id = ?",
      [id]
    );
    return rows[0];
  }

  async add(favorite) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, user_id) VALUES (?, ?)`,
      [favorite.recipe_id, favorite.user_id]
    );
    return result.insertId;
  }

  async destroy(userId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );

    return result.affectedRows;
  }
}

module.exports = FavoriteRepository;
