const bcrypt = require("bcrypt");
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
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async add(user) {
    const [result] = await this.database.query(
      ` INSERT INTO ${this.table} (firstname, lastname, username, email, role_id, password)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        user.role_id,
        user.password,
      ]
    );
    return result.insertId;
  }

  async login(email, password) {
    console.info("Registering user:", email, password);
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      throw new Error("Utilisateur non trouvé");
    }

    const user = rows[0];
    const isPasswordValid= await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }

    console.info("connecté avec succès:");
    return user;
  }

  async register(user) {
    console.info("Registering user:", user);

    
    const roleId = user.role_id || 1; 

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, username, email, role_id, password)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        roleId, 
        hashedPassword,
        user.password,
      ]
    );
    console.info("Inscription réussi:", result);
    return result.insertId;
  }


  async edit(user) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, username = ?, email = ?, role_id = ?, password = ? 
      where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        user.role_id,
        user.password,
        user.id,
      ]
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
