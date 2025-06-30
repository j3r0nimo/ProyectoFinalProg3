# Imagen base de Node.js
FROM node:18

# Crear y usar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias y luego instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Expone el puerto que usa Express
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]
