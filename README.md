# API Catalog

## Requisitos

- Node.js >= 18.20.4
- MongoDB

## Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Instalar MongoDB**:
   - Instalar MongoDB según tu sistema operativo
   - [Documentación oficial de MongoDB](https://docs.mongodb.com/manual/installation/)

3. **Instalar nodemon globalmente**:
   ```bash
   npm install -g nodemon
   ```

4. **Configurar variables de entorno**:
   - Crear un archivo `.env` en la raíz del proyecto
   - Configurar la URL de la base de datos y el JWT secret:
   ```
   MONGODB_URI=mongodb://localhost:27017/api-catalog
   JWT_SECRET=tu_jwt_secret_aqui
   ```

## Uso

1. **Iniciar la aplicación**:
   ```bash
   nodemon app.js
   ```

## Primera ejecución

- La primera vez que se ejecuta la aplicación, se crea automáticamente un usuario por defecto con las siguientes credenciales:
  - **Usuario**: admin
  - **Contraseña**: admin123

- También se crean pokemones de ejemplo automáticamente en la base de datos.