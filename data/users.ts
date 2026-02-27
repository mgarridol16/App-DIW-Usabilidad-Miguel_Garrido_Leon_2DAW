// Usuarios fijos de la aplicación
// Estos usuarios estarán disponibles sin importar dónde se despliegue la app

export interface FixedUser {
  username: string;
  password: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const FIXED_USERS: FixedUser[] = [
  {
    username: 'diego',
    password: 'Prieto*2',
    name: 'Diego',
    email: 'diego@capacitacion.com',
    role: 'user'
  },
  {
    username: 'admin',
    password: 'Prieto*2',
    name: 'Administrador',
    email: 'admin@capacitacion.com',
    role: 'admin'
  }
];

/**
 * Valida las credenciales de un usuario
 * @param username Nombre de usuario o email
 * @param password Contraseña
 * @returns Usuario si las credenciales son válidas, null si no
 */
export const validateCredentials = (
  username: string,
  password: string
): FixedUser | null => {
  const user = FIXED_USERS.find(
    (u) => 
      (u.username.toLowerCase() === username.toLowerCase() || 
       u.email.toLowerCase() === username.toLowerCase()) &&
      u.password === password
  );
  
  return user || null;
};
