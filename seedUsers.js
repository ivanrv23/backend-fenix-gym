const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  charset: 'utf8mb4'
};

// Datos de usuarios de prueba
const usersData = [
  {
    id_membership: 1,
    id_customer: 1001,
    name_user: 'alci',
    email_user: 'alci@fenixgym.com',
    password_user: 'Admin123',
    photo_user: '../../assets/users/juan.jpg',
    expiration_user: '2025-12-31'
  },
  {
    id_membership: 2,
    id_customer: 1002,
    name_user: 'ronal',
    email_user: 'ronal@fenixgym.com',
    password_user: 'Admin123',
    photo_user: '../../assets/users/maria.jpg',
    expiration_user: '2025-11-30'
  },
  {
    id_membership: 1,
    id_customer: 1003,
    name_user: 'david',
    email_user: 'david@fenixgym.com',
    password_user: 'Admin123',
    photo_user: '../../assets/users/carlos.jpg',
    expiration_user: '2025-10-15'
  },
  {
    id_membership: 3,
    id_customer: 1004,
    name_user: 'Ana Rodríguez',
    email_user: 'ana@fenixgym.com',
    password_user: 'ana2024',
    photo_user: '../../assets/users/ana.jpg',
    expiration_user: '2026-01-15'
  },
  {
    id_membership: 2,
    id_customer: 1005,
    name_user: 'Pedro Martínez',
    email_user: 'pedro@fenixgym.com',
    password_user: 'pedro123',
    photo_user: '../../assets/users/pedro.jpg',
    expiration_user: '2025-09-30'
  }
];

async function seedUsers() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado a la base de datos');

    // Insertar cada usuario
    for (const userData of usersData) {
      // Verificar si el usuario ya existe
      const [existingUser] = await connection.execute(
        "SELECT id_user FROM users WHERE email_user = ?",
        [userData.email_user]
      );
      
      if (existingUser.length > 0) {
        console.log(`⚠️ Usuario ya existe: ${userData.email_user}`);
        continue;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(userData.password_user, 10);

      // Insertar usuario
      const sql = `
        INSERT INTO users (
          id_membership, id_customer, name_user, email_user, 
          password_user, photo_user, expiration_user, state_user
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `;

      const values = [
        userData.id_membership,
        userData.id_customer,
        userData.name_user,
        userData.email_user,
        hashedPassword,
        userData.photo_user,
        userData.expiration_user
      ];

      await connection.execute(sql, values);
      console.log(`✅ Usuario insertado: ${userData.name_user}`);
    }

    console.log('🎉 Proceso completado');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

seedUsers();