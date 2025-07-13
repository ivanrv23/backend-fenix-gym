require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const roles = [
  { name: 'admin', description: 'Administrador del sistema' },
  { name: 'user', description: 'Usuario estándar' },
  { name: 'premium', description: 'Usuario premium' }
];

const users = [
  {
    role: 'admin',
    name: 'admin',
    password: 'admin123',
    email: 'admin@fenixgym.com',
    firstName: 'Administrador',
    lastName: 'Sistema',
    phone: '+1234567890',
    photo: 'admin-profile.jpg',
    state: 1,
    membership: 'active',
    expiration: '2025-07-12'  // Fecha fija en formato YYYY-MM-DD
  },
  {
    role: 'user',
    name: 'usuario1',
    password: 'user123',
    email: 'usuario1@fenixgym.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+59891234567',
    photo: 'user-profile.jpg',
    state: 1,
    membership: 'active',
    expiration: '2025-10-12'  // Fecha fija en formato YYYY-MM-DD
  }
];

async function run() {
  try {
    console.log('Iniciando inserción de datos...');
    
    // Insertar roles
    for (const role of roles) {
      const [result] = await db.promise().query(
        'INSERT INTO roles (role_name, description) VALUES (?, ?)',
        [role.name, role.description]
      );
      console.log(`Rol insertado: ${role.name} (ID: ${result.insertId})`);
    }
    
    // Insertar usuarios
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const [role] = await db.promise().query(
        'SELECT id_role FROM roles WHERE role_name = ?',
        [user.role]
      );
      
      if (!role.length) throw new Error(`Rol no encontrado: ${user.role}`);
      
      const [result] = await db.promise().query(
        `INSERT INTO users (
          id_role, name_user, password_user, email, 
          first_name, last_name, phone, photo_user,
          state_user, membership_status, expiration_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          role[0].id_role,
          user.name,
          hashedPassword,
          user.email,
          user.firstName,
          user.lastName,
          user.phone,
          user.photo,
          user.state,
          user.membership,
          user.expiration  // Fecha fija en formato string
        ]
      );
      
      console.log(`Usuario insertado: ${user.name} (ID: ${result.insertId})`);
    }
    
    console.log('✅ Datos iniciales insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando datos iniciales:', error.message);
    if (error.sql) {
      console.error('SQL ejecutado:', error.sql);
      console.error('Parámetros:', error.parameters);
    }
  } finally {
    db.end();
    console.log('Conexión a la base de datos cerrada');
  }
}

run();