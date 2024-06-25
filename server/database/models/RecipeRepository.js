const AbstractRepository = require("./AbstractRepository")

class RecipeRepository extends AbstractRepository {
    constructor() {
        super({ table: "recipe" })
    }

    async browse() {
        const [rows] = await this.database.query(
            `
          SELECT r.*, c.name as category_name
          FROM ${this.table} r
          INNER JOIN category c ON r.category_id = c.id
          `
        );
        return rows;
    }

    async readOneById(id) {
        const [rows] = await this.database.query(
            `
          SELECT r.*, c.name as category_name
          FROM ${this.table} r
          INNER JOIN category c ON r.category_id = c.id
          WHERE r.id = ?
          `,
            [id]
        );
        return rows[0];
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

}

module.exports = RecipeRepository;