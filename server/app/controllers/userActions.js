const argon2 = require("argon2");
const tables = require("../../database/tables");

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

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.add(user);
    res.json({ insertId });
  } catch (err) {
    next(err);
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
      user: { id: user.id, userName: user.username, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  const user = req.body;
  console.info("Received register request:", user);

  try {
    const insertId = await tables.user.register(user);
    res.json({ insertId });
  } catch (err) {
    console.error("Error during registration:", err);
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, id: req.params.id };

  try {
    await tables.user.edit(user);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  readOneById,
  add,
  edit,
  login,
  register,
  destroy,
};
