# Étape 1 : Utiliser une image Node.js officielle
FROM node:18

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du projet
COPY . .

# Étape 6 : Exposer le port 3000
EXPOSE 3000

# Étape 7 : Définir la commande pour démarrer l'application
CMD ["npm", "start"]
