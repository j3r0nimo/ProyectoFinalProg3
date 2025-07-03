## FRONTEND REACT - TRABAJO PRACTICO FINAL
---
### HERRAMIENTAS UTILIZADAS EN FRONT:
- Docker: contenemos las dependencias del sitio para hacer mas facil el correrlo
- React+Vite: crear la interfaz de usuario
- Axios: hacer peticiones HTTP con el backend para conectar al cliente con el servidor
- React-router-dom: manejo de navegacion entre paginas utilizado en SPAs 
- html2canvas: transformar elementos html en imagenes que se pueden almacenar
- jsbarcode: creacion de codigos de barras
---
```
frontend/
├── img/                      # Imágenes del proyecto
├── src/                      # Código fuente
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Vistas o páginas del sitio (Registrar, Perfil, Comprar)
│   ├── App.jsx               # Configuración de rutas principales con React Router
│   ├── app.css               # Estilos generales de la App
│   ├── index.jsx             # Punto de entrada principal
│   ├── index.css             # Estilos globales
├── index.html                # HTML base usado por Vite
├── package.json              # Configuración de dependencias y scripts
├── readme.md                 # README general
└── readmeFrontend.md         # README de la parte del Frontend
```

#### Docker:
Requisitos:
- docker desktop instalado
- tras la instalacion, abrir la aplicacion y hacerlo andar

Para correr el proyecto con Docker hay que poner 2 comandos en la terminal:
```
docker compose build
docker compose up -d
```
una vez puesto esos 2 comando, ir a la url: http://localhost:3000

### FUNCIONALIDADES:

#### Registro de usuario:
- verificacion de los campos de formulario
- validacion de que no se repita el DNI
- almacenamiento de usuario con localStorage

#### Vista del perfil de usuario:
- una vez registrado o ingresado el usuario, se te envia a una pagina que muestra los datos del usuario

#### Eliminacion de usuario:
- confirmacion en caso de no querer eliminar usuario
- una vez confirmado el eliminar usuario, este se es borrado de la base de datos

#### Visualizacion de tickets:
- vista de los tickets en el perfil
- detalles en cada ticket(codigo de barras, nombre de la banda, lugar del concierto, precio y sector)

#### Actualizacion de usuario:
- se ingresan los datos para actualizar el usuario
- se verifica si los datos son correctos y si el DNI no esta en el sistema(teniendo en cuenta que se puede repetir el DNI del mismo usuario)

#### Compra de entradas:
- seleccion de cantidad entradas y de sector
- calculo automatico del precio dependiendo del sector
- almacenamiento de las entradas compradas


## 0️⃣ API Backend - Trabajo Práctico Final
---

---
## 1️⃣ Servicios API
---
```

- Buscar cliente por DNI. 

- Obtener un único cliente.

- Obtener todos los clientes.

- Crear nuevo cliente.

- Actualizar un cliente por ID.

- Eliminar un cliente por ID.

- Realizar una compra.

- Buscar tickets por cliente.

- Buscar cantidad & tipo de tickets disponible.
```

---
## 2️⃣ Arquitectura General
---
```
                                             ↑                                             
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │    │             │
│  entidades  │◄──►│  servicios  │◄──►│controladores│◄───│    rutas    │◄───│     app     │◄───
│             │    │             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---
## 3️⃣ Estructura de Archivos Backend
---
```
proyecto/
├── backend/
│   ├── config/                 # Conección PosgredSQL.
│   ├── constants/              # Constantes comunes.
│   ├── controllers/            # Atienden la lógica req/res, via los servicios.
│   ├── database/               # Script de inicialización.
│   ├── middleware/             # Validación de datos del front-request.
│   ├── models/                 # Entidades.
│   ├── routes/                 # Rutas de la API.
│   ├── services/               # Capa de servicio, interacciona con la BDD.
│   ├── utils/                  # Funciones comunes
│   ├── Dockerfile.dev          # Imagen Docker para desarrollo.
│   ├── app.js                  # Inicio y Servidor.
│   ├── package.json            # Dependencias de Express.
│   ├──.env                     # Variables de entorno.
```

---
## 4️⃣ GET URL's 
---
```
http://localhost:3001/                        Retorna aviso de buen funcionamiento
http://localhost:3001/clientes                Retorna lista de todos los clientes
http://localhost:3001/clientes/:id            Retorna un cliente, por id
http://localhost:3001/clientes/dni/:dni       Retorna un cliente, por dni
http://localhost:3001/clientes/:id/tickets    Retorna tickets del cliente, por id
http://localhost:3001/tickets/disponibilidad  Retorna tickes disponibles, por tipo
```

---
## 5️⃣ POST nuevo cliente
---
```
http://localhost:3001/clientes                Para la carga de un nuevo cliente

    {
        "nombre": "Ruben Galvan",
        "dni": "22568974",
        "tarjetaNro": "5648539842109587",
        "tarjetaMA": "09/26",
        "codigoPostal": "1425"
    }
```

---
## 6️⃣ PUT editar cliente
---
```
http://localhost:3001/clientes/4              Para editar un cliente, por id.

    {
        "nombre": "Ruben Darío Galvan",
        "dni": "22568974",
        "tarjetaNro": "5648539842109587",
        "tarjetaMA": "09/26",
        "codigoPostal": "1425"
    }
```

---
## 7️⃣ DELETE cliente 
---
```
http://localhost:3001/clientes/4              Para borrar un cliente, por id.
```

---
## 8️⃣ POST compra 
---
```
http://localhost:3001/clientes/4              Para borrar un cliente, por id.

    {
        "clienteId": 5,
        "cantidad": 6,
        "sector": "Platea Sivori Media"
    }
```

---
## 9️⃣ Configuración del puerto
---
```
Puerto: El servidor está escuchando en el puerto 3001.
Este valor se configura en el archivo src/app.js
const PORT = process.env.PORT || 3001;
```

---
## 🔟 Configuración del archivo .env
---
```
Contenido de las variables del archivo.env
Se requiere cambio de DB_USER, según corresponda.
Se requiere cambio de DB_PASSWORD, según corresponda.
No deben quedar espacios de ningún tipo al hacer las modificaciones.

    DB_NAME=tickets_app
    DB_USER=modificar_con_su_usuario
    DB_PASSWORD=modificar_con_su_password
    DB_HOST=localhost
    DB_PORT=5432
```

## Proyecto Final de la materia Programacion 3

- Arce Carlos
- Baltian Ortiz Jeronimo
- Campagnucci Gianfranco
- Colantonio Dario