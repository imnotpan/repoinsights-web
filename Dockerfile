FROM node:18

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .

# Comando para iniciar la aplicación
CMD ["npm", "run", "serve"]
