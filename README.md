#Partiel de Technolog
***
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