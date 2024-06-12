const AbstractSeeder = require("./AbstractSeeder");

const RoleSeeder = require("./RoleSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true, dependencies: [RoleSeeder] });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeUser = {
        refName: `user_${i}`, // Create a reference name for the user
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        username: this.faker.person.middleName(),
        email: this.faker.internet.email(), // Generate a fake email using faker library
        role_id: this.getRef(`role_${i}`).insertId,
        password: this.faker.internet.password(), // Generate a fake password using faker library
      };

      this.insert(fakeUser); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
