# Étape 1 : Utiliser une image Node.js pour la construction
FROM node:14 as builder

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Construire l'application Vue.js pour la production
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour le déploiement de l'application
FROM nginx:1.21

# Copier les fichiers de build de l'étape précédente dans le conteneur Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 pour que l'application soit accessible
EXPOSE 80

# Démarrer le serveur Nginx une fois que le conteneur est lancé
CMD ["nginx", "-g", "daemon off;"]




