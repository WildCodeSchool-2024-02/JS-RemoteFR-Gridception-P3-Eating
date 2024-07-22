const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe" });
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
      SELECT
        r.id,
        r.title,
        r.descriptionText,
        r.steps,
        r.time,
        r.category_id,
        r.image,
        c.name as category_name,
        i.name as ingredient_name,
        i.calories,
        q.quantity
      FROM ${this.table} r
      INNER JOIN category c ON r.category_id = c.id
      INNER JOIN quantity q ON r.id = q.recipe_id
      INNER JOIN ingredient i ON q.ingredient_id = i.id
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
      image: rows[0].image,
      category_name: rows[0].category_name,
      ingredients: [],
    };

    rows.forEach((row) => {
      recipe.ingredients.push({
        ingredient_name: row.ingredient_name,
        calories: row.calories,
        quantity: row.quantity,
      });
    });

    return recipe;
  }

  async add(recipe) {
    const parsedRecipe = {
      ...recipe,
      category: parseInt(recipe.categoryId, 10),
      time: parseInt(recipe.time, 10),
    };

    const { title, description, steps, time, image, category } = parsedRecipe;

    const [result] = await this.database.query(
      `
          INSERT INTO ${this.table} (title, descriptionText, steps, time, image, category_id)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
      [title, description, steps, time, image, category]
    );
    return result.insertId;
  }

  async edit(id, recipe) {
    // mise à jour de la table recipe
    const { title, description, steps, time, image, category } = recipe;

    const [[categoryId]] = await this.database.query(
      `
      SELECT id
      FROM category
      WHERE name = ?
      `,
      [category]
    );

    const newRecipe = await this.database.query(
      `
      UPDATE ${this.table} SET
      title = ?,
      descriptionText = ?,
      steps = ?,
      time = ?,
      image = ?,
      category_id = ?
      WHERE id = ?
      `,
      [title, description, steps, time, image, categoryId.id, id]
    );

    return newRecipe[0].affectedRows;

    // mise à jour de la table quantity
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
