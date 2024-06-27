const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    super({ table: "favorite" });
  }

  async browse() {
    const [rows] = await this.database.query(`
    SELECT * FROM ${this.table}
    `);

    return rows;
  }

  async read() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async add(favorite) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, user_id) VALUES (?, ?)`,
      [favorite.recipe_id, favorite.user_id]
    );
    return result.insertId;
  }

  async edit(id, updatedFavorite) {
    const query = `
      UPDATE ${this.table} SET ? WHERE id = ?
    `;
    const [result] = await this.database.query(query, [updatedFavorite, id]);
    return result.affectedRows > 0;
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
