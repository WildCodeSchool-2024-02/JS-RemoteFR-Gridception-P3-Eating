const AbstractSeeder = require("./AbstractSeeder");

class RoleSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "role", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeRole = {
        role: this.faker.lorem.word(),
        refName: `role_${i}`, // Create a reference name for the user
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeRole); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the UserSeeder class
module.exports = RoleSeeder;
