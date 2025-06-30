## FRONTEND REACT - TRABAJO PRACTICO FINAL
---
### HERRAMIENTAS UTILIZADAS EN FRONT:
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



