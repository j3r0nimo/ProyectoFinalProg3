
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
Se requiere cambio de DB_USER, según corresponda
Se requiere cambio de DB_PASSWORD, según corresponda
No deben quedar espacios de ningún tipo al hacer las modificaciones.

    DB_NAME=tickets_app
    DB_USER=modificar_con_su_usuario
    DB_PASSWORD=modificar_con_su_password
    DB_HOST=localhost
    DB_PORT=5432
```