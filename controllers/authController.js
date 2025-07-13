const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    // Buscar usuario por nombre de usuario
    const [results] = await db.query(
      "SELECT * FROM users WHERE name_user = ?",
      [user]
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
        rol: usuario.id_role,
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
    await db.query("UPDATE users SET refresh_token = ? WHERE id_user = ?", [
      refreshToken,
      usuario.id_user,
    ]);

    res.success("Login exitoso", {
      accessToken,
      refreshToken,
      userData: {
        id: usuario.id_user,
        name: usuario.first_name || usuario.name_user,
        fullName: `${usuario.first_name} ${usuario.last_name}`,
        email: usuario.email,
        phone: usuario.phone,
        profileImage: usuario.photo_user || null,
        role: usuario.id_role,
        roleName: "Miembro", // Debes obtener esto de la tabla roles
        membershipActive:
          usuario.membership_status === "active" &&
          new Date(usuario.expiration_date) > new Date(),
        membershipExpiration: usuario.expiration_date,
        joinDate: usuario.created_at,
        notifications: usuario.notifications_enabled || true,
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
      "SELECT * FROM users WHERE id_user = ? AND refresh_token = ?",
      [decoded.id, refreshToken]
    );

    if (users.length === 0) {
      return res.unauthorized("Refresh token inválido");
    }

    const user = users[0];

    // Generar nuevo access token
    const newAccessToken = jwt.sign(
      {
        id: user.id_user,
        user: user.name_user,
        rol: user.id_role,
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
    await db.query("UPDATE users SET refresh_token = NULL WHERE id_user = ?", [
      userId,
    ]);

    res.success("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error en logout:", error);
    res.serverError();
  }
};
