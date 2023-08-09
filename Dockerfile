# Étape 1 : Builder l'application Vue.js
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour héberger l'application
FROM nginx:1.21.6

# Supprimer le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier votre propre fichier de configuration Nginx
COPY default.conf /etc/nginx/conf.d/nginx.conf

# Copier le fichier build-icons.js dans le répertoire approprié de Docker
COPY src/@iconify/build-icons.js /app/src/@iconify/build-icons.js

# Copier les fichiers de l'application construite
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
