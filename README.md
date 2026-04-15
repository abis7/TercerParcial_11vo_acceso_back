# GuitarLA — Backend API

API RESTful desarrollada con Node.js, Express, TypeScript y PostgreSQL (Sequelize) para el proyecto GuitarLA.

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- PostgreSQL (local o en la nube, ej. Render)

---

## Instalación de dependencias

```bash
npm install
```

---

## Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_URL=PRIV
```

---

## Arrancar el servidor

**Modo desarrollo** (con hot-reload via nodemon):

```bash
npm run dev
```

El servidor corre en: `http://localhost:4000`

---

## Endpoints disponibles

| Método | Endpoint        | Descripción                        |
|--------|-----------------|------------------------------------|
| GET    | /Api            | Obtener todos los productos        |
| GET    | /Api/:id        | Obtener producto por ID            |
| POST   | /Api            | Crear nuevo producto               |
| PUT    | /Api/:id        | Actualizar producto completo       |
| PATCH  | /Api/:id        | Toggle de disponibilidad           |
| DELETE | /Api/:id        | Eliminar producto                  |

---

## Estructura del proyecto

```
src/
├── config/
│   └── db.ts              # Conexión a PostgreSQL con Sequelize
├── handlers/
│   └── product.ts         # Controladores CRUD
├── middleware/
│   └── index.ts           # Validación de errores (express-validator)
├── models/
│   └── Product.model.ts   # Modelo Sequelize del producto
├── router.ts              # Definición de rutas y validaciones
├── server.ts              # Configuración de Express y CORS
└── index.ts               # Punto de entrada, conexión DB y listen
```

---

## Campos del modelo Product

| Campo        | Tipo          | Descripción                        |
|--------------|---------------|------------------------------------|
| id           | INTEGER       | PK autoincremental                 |
| name         | STRING        | Nombre del producto                |
| image        | STRING        | Nombre del archivo de imagen       |
| description  | TEXT          | Descripción del producto           |
| price        | DECIMAL(10,2) | Precio unitario                    |
| quantity     | INTEGER       | Stock disponible                   |
| availability | BOOLEAN       | Disponibilidad (default: true)     |

---

## Tecnologías utilizadas

- Node.js + TypeScript
- Express.js
- Sequelize + sequelize-typescript
- PostgreSQL
- express-validator
- dotenv
- nodemon + tsx
# TercerParcial_11vo_acceso_back
