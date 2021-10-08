# Partiel de Technolog
Projet réalisé dans le cadre du cours Technologie Logicielle enseigné en Master 1 Miage.
Réalisation :
- Création d'une API Rest avec Node.js et Express
- Dockerisation de l'environnement de développement et de production

Les images sont disponibles sur [DockerHub](https://hub.docker.com/) :
- [Front](https://hub.docker.com/repository/docker/backtrack5r3/exam_front)
- [Back](https://hub.docker.com/repository/docker/backtrack5r3/exam_back)

Pour lancer le projet en environnement de production :
```
docker-compose up
```

Pour lancer le projet en environnement de développement :
```
docker-compose up -f ./docker-compose.dev.yml up --build
```

Il est également possible de build et push les images issues des Dockerfile de l'environnement de dev à l'aide des commandes suivantes :
- Pour Windows :
```
./publish.ps1 [dev] (par défaut la commandes agit en mode prod)
```
- Pour Linux/Mac :
```
./publish.sh [dev] (par défaut la commandes agit en mode prod)
```

Une interface graphique pour Mongo est disponible à l'adresse suivante pour les deux environnements :
```
http://localhost:8081/
```
