# 📱 Application Mobile de Messagerie en temps réel

<p align="center">
![{370B7E8A-F413-4056-B030-63993BE9F2B3}](https://github.com/user-attachments/assets/c394b8ac-f74b-4283-9243-75fdbba89660)
</p>

## 📌 Objectif

Ce projet a pour but de proposer une application de chat en temps réel, semblable à Messenger ou Instagram, avec une interface intuitive et une expérience utilisateur fluide. Que ce soit pour une conversation individuelle ou de groupe, l'application offre une synchronisation instantanée des messages.

## 🎯 Fonctionnalités principales

- **Communication en temps réel** grâce aux WebSockets (Django Channels côté backend, WebSocket standard côté frontend).
- **Système d'authentification complet** (enregistrement, connexion, gestion de session).
- **Interface inspirée de Messenger & Insta** : une expérience utilisateur familière et ergonomique.
- **Gestion des connexions simultanées** pour plusieurs utilisateurs sans latence.
- **Notifications** ou alertes en temps réel (optionnel, si tu l'implémentes).
- **Base de données** PostgreSQL pour stocker et récupérer l'historique des messages.

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

- Django pour la structure MVC et la gestion de l'authentification.
- Django Channels pour les WebSockets (channel layers, routing).
- asgiref (dépendance Django Channels).
- psycopg2 (ou équivalent) pour la connexion à PostgreSQL.

### 💡 **Frontend (React Native)**

- Expo pour faciliter le développement et le déploiement sur mobile.
- Expo Router (pour la navigation entre les différentes pages de l'app).
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

1. Crée un environnement virtuel (recommandé) :

`python -m venv venv`
`source venv/bin/activate` # macOS/Linux
`venv\Scripts\activate` # Windows

2. Installe les dépendances (fichier requirements.txt ou pyproject.toml) :

`pip install -r requirements.txt`

3. Fais les migrations et lance le serveur :

`python manage.py migrate`
`python manage.py runserver`

4. (Optionnel) Lance Redis ou un autre channel layer si tu configures Django Channels pour la production (souvent nécessaire en environnement réel).

### 3️⃣ Lancer l'application en mode développement

1. Crée un environnement virtuel (recommandé) :

`cd frontend-react-native`
`npm install`

2. Lance l'application en mode développement :

`expo start`

📌 **Astuce** : Utilisez l'application Expo Go sur votre téléphone pour tester immédiatement l'application !

## 🌐 Configuration des WebSockets

Dans Django Channels :

- Le fichier routing.py définit la route WebSocket principale (ex. ws/chat/) et la relie à un consumer (ex. ChatConsumer).
- Le fichier settings.py est configuré pour pointer vers un channel layer (ex. Redis).

Dans React Native :

Utilise l'API WebSocket standard pour te connecter à l'URL du backend :

`const ws = new WebSocket("ws://<ton-serveur>:8000/ws/chat/");`

Gère les callbacks onopen, onmessage, onclose pour envoyer/recevoir des messages.

## 🔥 Difficultés surmontées

- Gestion des connexions simultanées : mise en place d'un channel layer pour gérer plusieurs utilisateurs en ligne sans conflit.
- Optimisation des performances : compression des réponses, gestion efficace du state, pagination des messages.
- Synchronisation en temps réel : éviter les déconnexions intempestives et gérer la reconnexion automatique du socket.

## 📬 Contact

Si vous avez des questions ou suggestions, n'hésitez pas à me contacter ! 😊

**Armand PETIT**

🖥️ Développeur React Native

📧 [armand_petit@outlook.fr](mailto:armand_petit@outlook.fr)

📅 [Réserver un appel](https://calendly.com/armand_petit/30min)

# realtime-chat
