const argon2 = require("argon2");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.browse();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const user = await tables.user.readOneById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await tables.user.findOneByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  const user = req.body;

  const hashedPassword = await argon2.hash(user.password, hashingOptions);

  user.password = hashedPassword;

  try {
    const insertId = await tables.user.register(user);
    res.json({ insertId });
  } catch (err) {
    console.error("Error during registration:", err);
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const affectedRows = await tables.user.edit(req.params.id, req.body);

    if (affectedRows > 0) {
      const updatedUser = await tables.user.readOneById(req.params.id);

      const response = {
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        username: updatedUser.username,
        id: updatedUser.id,
        role: updatedUser.role,
      };

      res.json({ message: "User updated successfully", user: response });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await tables.user.destroy(id);
    if (success) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  readOneById,
  edit,
  login,
  register,
  destroy,
};
