const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe" });
  }

  async browse() {
    const [rows] = await this.database.query(
      `
      SELECT *
      FROM ${this.table} r
      INNER JOIN category c ON r.category_id
      `
    );
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `
      SELECT *, c.name as category
      FROM ${this.table} r
      LEFT JOIN category c ON r.category_id = c.id
      WHERE r.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const recipe = {
      id: rows[0].id,
      title: rows[0].title,
      descriptionText: rows[0].descriptionText,
      steps: rows[0].steps,
      time: rows[0].time,
      category: rows[0].category,
    };

    return recipe;
  }

  async add(recipe) {
    const { title, descriptionText, steps, time, categoryId } = recipe;
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (title, descriptionText, steps, time, category_id)
      VALUES (?, ?, ?, ?, ?)
    `,
      [title, descriptionText, steps, time, categoryId]
    );
    return result.insertId;
  }

  async edit(id, recipe) {
    const { title, descriptionText, steps, time, categoryId } = recipe;
    const [result] = await this.database.query(
      `
          UPDATE ${this.table} 
          SET title = ?, descriptionText = ?, steps = ?, time = ?, category_id = ?
          WHERE id = ?
        `,
      [title, descriptionText, steps, time, categoryId, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `
          DELETE FROM ${this.table} WHERE id = ?
        `,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = RecipeRepository;
