# frontend/Dockerfile

# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Build del frontend
RUN npm run build

# Servir los archivos estáticos con 'serve'
RUN npm install -g serve

# Exponer puerto del servidor (default: 5173 si estás sirviendo Vite, o 3000 si usás create-react-app)
EXPOSE 5173

# Comando para servir la app
CMD ["serve", "-s", "dist"]
