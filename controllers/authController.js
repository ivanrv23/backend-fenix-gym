const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const [results] = await db.query(
      `SELECT * FROM users u 
       INNER JOIN memberships m ON u.id_membership = m.id_membership
       INNER JOIN customers c ON u.id_customer = c.id_customer 
       WHERE name_user = ? OR email_user = ?`,
      [user, user]
    );

    if (results.length === 0) {
      return res.unauthorized("Credenciales inválidas");
    }

    const usuario = results[0];

    if (usuario.state_user !== 1) {
      return res.unauthorized("Cuenta inactiva");
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password_user);
    if (!passwordMatch) {
      return res.unauthorized("Credenciales inválidas");
    }

    // Actualizar último login
    await db.query("UPDATE users SET login_user = NOW() WHERE id_user = ?", [usuario.id_user]);

    // Generar tokens
    const accessToken = jwt.sign(
      { id: usuario.id_user, user: usuario.name_user, rol: usuario.id_membership },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
      { id: usuario.id_user, type: "refresh" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );

    await db.query("UPDATE users SET token_user = ? WHERE id_user = ?", [refreshToken, usuario.id_user]);

    // Respuesta consistente
    res.success("Autenticación exitosa", {
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
        statemembership: usuario.state_user === 1 && new Date(usuario.expiration_user) > new Date() 
                         ? "Activa" : "Inactiva",
        expirationmembership: usuario.expiration_user,
        joindate: usuario.created_user,
        lastlogin: usuario.login_user,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.serverError("Error en el proceso de autenticación");
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.badRequest("Token de refresco requerido");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.unauthorized("Tipo de token inválido");
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE id_user = ? AND token_user = ?",
      [decoded.id, refreshToken]
    );

    if (users.length === 0) {
      return res.unauthorized("Token de refresco inválido");
    }

    const user = users[0];
    
    // Generar nuevo token de acceso
    const newAccessToken = jwt.sign(
      { id: user.id_user, user: user.name_user, rol: user.id_membership },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    res.success("Token renovado", {
      accessToken: newAccessToken,
      refreshToken // Devuelve el mismo refresh token
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.unauthorized("Token de refresco expirado");
    }
    console.error("Error en refreshToken:", error);
    res.unauthorized("Token de refresco inválido");
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.id;

  try {
    // Eliminar refresh token y limpiar sesión
    await db.query("UPDATE users SET token_user = NULL, login_user = NULL WHERE id_user = ?", [userId]);
    
    res.success("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error en logout:", error);
    res.serverError("Error al cerrar sesión");
  }
};