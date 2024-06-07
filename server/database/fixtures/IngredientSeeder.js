const AbstractSeeder = require("./AbstractSeeder");

class IngredientSeeder extends AbstractSeeder {
    constructor() {
        super({ table: "ingredient", truncate: true });
    }

    run() {
        for (let i = 0; i < 10; i += 1) {

            const fakeIngredient = {
                name: this.faker.commerce.product(),
                calories: this.faker.number.int({ min: 10, max: 100 }),
            };

            this.insert(fakeIngredient);
        }
    }
}

module.exports = IngredientSeeder;