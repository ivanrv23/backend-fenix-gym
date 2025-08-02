const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    // Buscar usuario por nombre de usuario
    const [results] = await db.query(
      `SELECT * FROM users u INNER JOIN memberships m ON u.id_membership = m.id_membership
      INNER JOIN customers c ON u.id_customer = c.id_customer WHERE name_user = ? OR email_user = ?`,
      [user, user]
    );

    if (results.length === 0) {
      return res.unauthorized("Usuario o contraseña incorrectos");
    }

    const usuario = results[0];

    // Verificar estado del usuario
    if (usuario.state_user !== 1) {
      return res.unauthorized("Usuario inactivo");
    }

    // Verificar contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, usuario.password_user);

    if (!passwordMatch) {
      return res.unauthorized("Usuario o contraseña incorrectos");
    }

    // Generar tokens JWT
    const accessToken = jwt.sign(
      {
        id: usuario.id_user,
        user: usuario.name_user,
        rol: usuario.id_membership,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: usuario.id_user,
        type: "refresh",
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );

    // Guardar refresh token en la base de datos
    await db.query("UPDATE users SET token_user = ? WHERE id_user = ?",
      [refreshToken, usuario.id_user,]
    );

    res.success("Login exitoso", {
      accessToken,
      refreshToken,
      userData: {
        id: usuario.id_user,
        user: usuario.name_user,
        name: usuario.name_customer,
        lastname: usuario.lastname_customer,
        email: usuario.email_user,
        phone: usuario.phone_customer,
        photo: usuario.photo_user,
        idmembership: usuario.id_membership,
        namemembership: usuario.name_membership,
        statemembership:
          usuario.state_user === 1 && new Date(usuario.expiration_user) > new Date()
            ? "Activa" : "Inactiva",
        expirationmembership: usuario.expiration_user,
        joindate: usuario.created_user,
        lastlogin: usuario.login_user,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.serverError();
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.badRequest("Refresh token no proporcionado");
  }

  try {
    // Verificar el refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.unauthorized("Tipo de token inválido");
    }

    // Verificar que el token esté en la base de datos
    const [users] = await db.query(
      "SELECT * FROM users WHERE id_user = ? AND token_user = ?",
      [decoded.id, refreshToken]
    );

    if (users.length === 0) {
      return res.unauthorized("Refresh token inválido");
    }

    const user = users[0];

    // Generar nuevo access token
    const newAccessToken = jwt.sign(
      {
        id: usuario.id_user,
        user: usuario.name_user,
        rol: usuario.id_membership,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    res.success("Token renovado", {
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.unauthorized("Refresh token expirado");
    }
    console.error("Error en refreshToken:", error);
    res.unauthorized("Refresh token inválido");
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.id;

  try {
    // Eliminar refresh token de la base de datos
    await db.query("UPDATE users SET token_user = NULL WHERE id_user = ?", [
      userId,
    ]);

    res.success("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error en logout:", error);
    res.serverError();
  }
};
