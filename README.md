# 📱 Application Mobile de Messagerie en temps réel

<p align="center">
  <img src="https://github.com/user-attachments/assets/64c44a9f-3f2f-4ed5-8a08-d5464bec7cba" alt="Aperçu de l'application">
</p>

## 📌 Objectif

Ce projet a pour but de proposer une application de chat en temps réel, semblable à Messenger ou Instagram, avec une interface intuitive et une expérience utilisateur fluide. Que ce soit pour une conversation individuelle ou de groupe, l’application offre une synchronisation instantanée des messages.

## 🎯 Fonctionnalités principales

- **Communication en temps réel** grâce aux WebSockets (Django Channels côté backend, WebSocket standard côté frontend).
- **Système d'authentification complet** (enregistrement, connexion, gestion de session).
- **Interface inspirée de Messenger & Insta** : une expérience utilisateur familière et ergonomique.
- **Gestion des connexions simultanées** pour plusieurs utilisateurs sans latence.
- **Notifications** ou alertes en temps réel (optionnel, si tu l’implémentes).
- **Base de données** PostgreSQL pour stocker et récupérer l’historique des messages.

## ⚙️ Technologies utilisées

L'application est développée avec :

- **Django** (framework Python) pour la partie backend.
- **Django Channels** pour la prise en charge des WebSockets et du temps réel côté serveur.
- **PostgreSQL** pour la base de données et le stockage des messages.
- **React Native (via Expo)** pour le frontend mobile.
- **WebSocket** natif côté React Native (pas de librairies tierces) pour la communication temps réel.

## 📦 Bibliothèques principales

Voici un aperçu des dépendances utilisées dans le projet :

### 🏗️ **Backend (Django)**

- Django pour la structure MVC et la gestion de l’authentification.
- Django Channels pour les WebSockets (channel layers, routing).
- asgiref (dépendance Django Channels).
- psycopg2 (ou équivalent) pour la connexion à PostgreSQL.

### 💡 **Frontend (React Native)**

- Expo pour faciliter le développement et le déploiement sur mobile.
- Expo Router (pour la navigation entre les différentes pages de l’app).
- WebSocket API intégrée à React Native pour gérer la communication temps réel.

### 🔒 **Sécurité & Authentification**

- axios (gestion des requêtes API)
- gestion des tokens ou des sessions via Django (ex. JWT)
- Stockage sécurisé des données (par exemple via AsyncStorage) côté mobile.
- expo-image & expo-image-picker (gestion des images)
- cloudinary (stockage des images)

### 🎨 **Animations & UX**

- react-native-reanimated
- react-native-gesture-handler
- expo-vector-icon

## 🚀 Comment démarrer ?

### 1️⃣ Cloner le projet

`git clone https://github.com/VirtuozTM/realtime-chat.git`

`cd nom-du-projet`

### 2️⃣ Lancer le backend (Django)

`npm install`

### 3️⃣ Lancer l'application en mode développement

`expo start`

📌 **Astuce** : Utilisez l'application Expo Go sur votre téléphone pour tester immédiatement l'application !

## 📬 Contact

Si vous avez des questions ou suggestions, n'hésitez pas à me contacter ! 😊

**Armand PETIT**

🖥️ Développeur React Native

📧 [armand_petit@outlook.fr](mailto:armand_petit@outlook.fr)

📅 [Réserver un appel](https://calendly.com/armand_petit/30min)
# realtime-chat
