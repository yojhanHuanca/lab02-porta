<div align="center">

# Lab 02 — Portafolio & CRUD de Usuarios

**Portafolio personal full stack con panel administrativo, desplegado 100% en Render.**

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4479A1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Three.js](https://img.shields.io/badge/Three.js-r180-000000?logo=three.js&logoColor=white)](https://threejs.org)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)](https://render.com)

[🌐 Ver portafolio en vivo](https://lab-02-angular.onrender.com) ·
[⚙️ Panel de Usuarios](https://lab-02-angular.onrender.com/usuarios) ·
[🔌 API](https://lab02-api.onrender.com/api/health)

</div>

---

## 📖 Índice

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Demo en vivo](#-demo-en-vivo)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del repositorio](#-estructura-del-repositorio)
- [Desarrollo local](#-desarrollo-local)
- [Despliegue en Render](#️-despliegue-en-render)
- [Funcionalidad del CRUD](#-funcionalidad-del-crud)
- [Autor](#-autor)

---

## 🧭 Sobre el proyecto

Este repositorio junta las dos entregas del laboratorio en **una sola aplicación desplegable**:

| Parte | Descripción |
|---|---|
| 🎨 **Portafolio** | Landing page personal con animaciones, fondo 3D interactivo (Three.js) y scroll reveal, hecha en Angular. |
| 🗃️ **CRUD de Usuarios** | Panel administrativo conectado a PostgreSQL en tiempo real — crear, listar, editar y eliminar usuarios, sin `localStorage`. |

Ambas partes comparten un solo repositorio y se despliegan juntas mediante un **Render Blueprint**
(`render.yaml`), que aprovisiona automáticamente la base de datos, la API y el sitio estático.

## 🚀 Demo en vivo

| Servicio | URL | Descripción |
|---|---|---|
| 🖥️ Portafolio | [lab-02-angular.onrender.com](https://lab-02-angular.onrender.com) | Landing page principal |
| 👥 Panel de Usuarios | [/usuarios](https://lab-02-angular.onrender.com/usuarios) | CRUD conectado a PostgreSQL |
| 🔌 API | [lab02-api.onrender.com](https://lab02-api.onrender.com/api/health) | Health check de la API |

> ⏳ El plan gratuito de Render "duerme" la API tras ~15 min de inactividad. La primera petición
> puede tardar hasta 50 s en responder — es esperado, no es un error.

## 🛠 Stack tecnológico

**Frontend**
![Angular](https://img.shields.io/badge/-Angular-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/-Three.js-000000?logo=three.js&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-663399?logo=css3&logoColor=white)

**Backend**
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4479A1?logo=postgresql&logoColor=white)

**Infraestructura**
![Render](https://img.shields.io/badge/-Render-46E3B7?logo=render&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

## 📂 Estructura del repositorio

```text
/                             App Angular (portafolio + panel /usuarios)
├── src/app/pages/portfolio   Portafolio: hero 3D, skills, proyectos, contacto
├── src/app/pages/usuarios    CRUD de usuarios: tabla, alta, edición, baja
├── src/app/shared            Íconos, fondo 3D (Three.js), scroll-reveal
└── src/environments          URLs de la API (dev / producción)

/server                       API Express + PostgreSQL (CRUD de usuarios)
├── index.js                  Punto de entrada, CORS, rutas
├── db.js                     Conexión a PostgreSQL (pg / Neon serverless)
└── routes.usuarios.js        Endpoints REST del CRUD

render.yaml                   Blueprint: base de datos + API + sitio estático
```

## 💻 Desarrollo local

### Requisitos

- Node.js 24 LTS
- npm
- Una base PostgreSQL para el backend (local o gratis en [Neon](https://neon.tech))

### 1 · Backend

```bash
cd server
npm install
```

Crea `server/.env` (usa [`server/.env.example`](server/.env.example) como plantilla):

```env
DATABASE_URL=postgresql://usuario:password@host/basedatos?sslmode=require
CORS_ORIGIN=http://localhost:4200
PORT=3000
```

```bash
npm start
```

La API crea sola la tabla `usuarios` si no existe y queda disponible en
`http://localhost:3000/api`.

> 💡 Si tu `DATABASE_URL` apunta a Neon, `server/db.js` detecta el host `neon.tech` y cambia
> automáticamente al driver `@neondatabase/serverless` (HTTPS) en vez de `pg` (TCP 5432) — útil
> en redes que bloquean ese puerto. Contra Postgres normal (local o Render) usa `pg` sin cambios.

### 2 · Frontend

```bash
npm install
npm start
```

Abre `http://127.0.0.1:4200/`. La URL de la API para desarrollo vive en
[`src/environments/environment.ts`](src/environments/environment.ts).

## ☁️ Despliegue en Render

Todo el proyecto se despliega junto con el Blueprint definido en
[`render.yaml`](render.yaml), que crea 3 recursos:

| Recurso | Tipo | Rol |
|---|---|---|
| `lab02-db` | PostgreSQL (free) | Base de datos del CRUD |
| `lab02-api` | Web Service (Node) | API Express, conectada sola a `lab02-db` |
| `lab-02-angular` | Static Site | Build de producción de Angular |

<details>
<summary><strong>Ver los pasos completos</strong></summary>

1. **Sube el código a GitHub**
   ```bash
   git add -A
   git commit -m "mensaje"
   git push origin main
   ```

2. Entra a [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**.

3. **Conecta el repositorio**:
   - Si tu GitHub ya está vinculado a Render, selecciónalo de la lista.
   - Si es privado y no aparece, usa **Connect account** para autorizar GitHub, o pega la URL en
     "Public Git Repository" si el repo es público (nota: por esta vía el **auto-deploy queda
     desactivado** — cada cambio necesita un *Manual Deploy* desde el dashboard).

4. Render detecta `render.yaml` solo y muestra los 3 recursos a crear. Ponle nombre al Blueprint
   y dale **Deploy Blueprint**.

5. Espera unos minutos mientras Render aprovisiona la base, instala dependencias, arranca la API
   y compila + publica el frontend.

6. **Verifica las URLs**: cada servicio queda en `https://<nombre>.onrender.com`. Si Render
   asignó nombres distintos a `lab02-api` o `lab-02-angular`, actualiza la URL en
   [`environment.prod.ts`](src/environments/environment.prod.ts) y vuelve a desplegar.

7. **Revisa CORS**: `CORS_ORIGIN` en `lab02-api` debe coincidir con la URL pública del frontend
   (ya viene configurado en `render.yaml`).

</details>

> ⚠️ **Plan free**: la base de datos gratuita de Render expira a los 30 días de creada — Render
> avisa la fecha exacta en su dashboard. Antes de esa fecha hay que subir a un plan pago o crear
> una base nueva y actualizar `DATABASE_URL` en `lab02-api`.

## ✅ Funcionalidad del CRUD

El **Panel de Usuarios** (`/usuarios`, accesible desde el botón del portafolio) permite:

- ➕ Crear usuarios (nombre, correo, teléfono, rol)
- 📋 Listar y buscar usuarios
- ✏️ Editar usuarios existentes
- 🗑️ Eliminar usuarios (con confirmación)

Todos los datos viven en PostgreSQL a través de la API Express — nada se guarda en
`localStorage`.

## 👤 Autor

**Yojhan Leodan Huanca Yucra**
Full Stack Developer · Estudiante de Diseño y Desarrollo de Software en Tecsup

📧 yhuancayucra@gmail.com

---

<div align="center">

Proyecto académico — Lab 02, Computación en la Nube (AWS) · Tecsup

</div>
