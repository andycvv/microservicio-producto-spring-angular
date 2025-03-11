
# 🛒 Microservicio de Productos con Angular y Spring Boot

Este proyecto es una aplicación web para la gestión de productos y categorías, desarrollado con **Spring Boot** en el backend y **Angular** en el frontend.

## 🚀 Tecnologías usadas
- **Backend:** Java + Spring Boot (REST)
- **Frontend:** Angular + Angular Material
- **Base de datos:** SQL Server
---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (`>= 16.x`)
- **Java JDK 17+**
- **SQL Server** (Local o en la nube)

---

## 📂 Estructura del proyecto

```plaintext
📦 microservicio-producto-angular-spring
 ┣ 📂 backend
 ┃ ┗ 📂 producto-servicio → API REST (Spring Boot)
 ┃    ┣ 📂 src/main/java/com/tuempresa/productos
 ┃    ┣ 📜 pom.xml
 ┃    ┗ 📜 application.properties
 ┃  
 ┣ 📂 frontend
 ┃ ┗ 📂 crud-producto-categoria  → Aplicación web (Angular)
 ┃    ┣ 📂 src/app
 ┃    ┣ 📂 src/environments
 ┃    ┣ 📜 package.json
 ┃    ┗ 📜 angular.json
 ┗ 📜 README.md
```

---

## 🔧 Configuración de la Base de Datos

### 1️⃣ **Crear la base de datos en SQL Server**  
Ejecuta en SQL Server:

```sql
CREATE DATABASE DB_PRODUCTO_SERVICIO;
```

### 2️⃣ **Configurar credenciales de la base de datos**  
Edita `backend/src/main/resources/application.properties`:

```properties
spring.application.name=producto-servicio

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=DB_PRODUCTO_SERVICIO;encrypt=true;trustServerCertificate=true;
spring.datasource.username=sa
spring.datasource.password=sql
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true

server.servlet.context-path=/api/v1
```

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ **Levantar el backend (Spring Boot)**
Si tienes un IDE, puedes levantarlo de la forma tradicional, sino, usa este comando de maven:
```sh
cd backend/producto-servicio
mvn spring-boot:run
```

### 2️⃣ **Levantar el frontend (Angular)**
```sh
cd frontend/crud-producto-categoria
npm install  # Solo la primera vez
npm start
```

El frontend estará disponible en: [http://localhost:4200](http://localhost:4200)

---

## 🔄 Configuración de Angular

Si necesitas cambiar la URL del backend en el frontend, edita:

```ts
// frontend/crud-producto-categoria/src/environments/environment.development.ts
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

Si el backend usa otro puerto, cambia `http://localhost:8080` por el correcto.

---

## 📌 Notas adicionales

- Si tienes un puerto diferente en SQL Server, actualiza `application.properties`.
- Verifica que los servicios de SQL Server estén activos.
- La configuración de CORS permite peticiones desde `http://localhost:4200` por defecto. Si deseas cambiarlo, lo puedes hacer en el archivo CorsConfig.java en el package configuration del backend.
