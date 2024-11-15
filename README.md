# Todolist (PoC)

Application Back End distribuée basée sur les micro services.

- Docker
- Express.js + Node.js
- RabbitMQ
- WebSocket
- MySQL

__Ce projet est une preuve de concept fournie à des fins pédagogiques. 🚨 Le code n'est pas optimisé.__

## Installation

- Créer et remplir les fichiers suivants en vous basant sur le contenu des fichiers .env.example :
  - /adminer/.env
  - /api/.env
  - /mq/.env
  - /db/.env
  - /mq/.env
  - /ws/.env

- Démarrer les services : `docker compose up` (et consultez les logs dans le terminal pour vous assurez que les services communiquent).

- Patientez quelques secondes le temps que le services se démarrent.

## Définition des services

- __adminer__ (<http://localhost:8080>) : interface web d'administration de base de données (PHP).
- __api__ (<http://localhost:3333>) : service Node.js API REST (Express.js), permet de :
  - lire une liste de Tasks (<http://localhost:3333/tasks>),
  - lire une Task par son id (<http://localhost:3333/tasks/{id}>),
  - mettre à jour le statut d'une Task par son id (<http://localhost:3333/tasks/{id}>) et envoyer un message au service mq (ajout d'un message dans la queue "tasks_completed")
- __client__ (<http://localhost:8181>) : service NGINX permettant d'afficher une page HTML. La page HTML contient un script JS permettant d'abonner un utilisateur aux notifications Websocket à partir de l'id renseigné dans la barre d'adresse du navigateur (ex : <http://localhost:8181/index.html?user_id=1>). La page HTML affiche les notifications Websocket dynamiquement à l'écran et dans la console JS.
- __db__ : base de données MariaDB contenant 2 tables (tasks et users)
- __mq__ (<http://localhost:15673>) : service RabbitMQ permettant d'émettre, stocker et recevoir des messages via AMQP.
- __ws__ (<ws://localhost:3080>) : serveur Node.js permettant d'émettre et recevoir des messages via Websocket, abonné à la queue "tasks_completed" du service "mq" (RabbitMQ)

## Scénario de test

### Résumé

- Utilisateur s'abonne aux notifications liées à son id
- Mise à jour du statut d'une Task
- Ajout d'un message dans la queue RabbitMQ
- Le service ws récupère le message depuis la queue
- Le service ws émet une notification à l'utilisateur qui s'est abonné

### Scénario complet

#### Avec le client web (<http://localhost:8181>)

- Démarrez les services Docker et attendre que tout soit opérationnel (une dizaine de secondes environ),
- La base de données contient des données de test ("Tasks" et "Users" fictifs),

- Utilisez le client web pour vous connecter au serveur "ws" en vous rendant à l'adresse : <http://localhost:8081/index.html?user_id=1>
- L'utilisateur dont l'id est #1 est ainsi inscrit aux notifications émises par le serveur "ws" lorsque le statut d'une Task évolue
- Consultez la console JavaScript dans le navigateur pour observer les messages reçus et éventuelles erreurs.
- Lorsque le serveur ws émet une notification, la page HTML doit être mise à jour automatiquement dès réception de la notification.

#### Avec le client websocket de Postman

- Utilisez Postman pour vous connecter au serveur "ws" :
  - Sélectionnez le type de requête websocket,
  - Dans la barre d'adresse, saissez l'adresse <ws://localhost:3080>
  - Cliquez sur le bouton "Connect"
  - Si la connexion au service ws est ok :
    - Dans l'onglet "Message", saisisez le message au format JSON : ```JSON {"type":"subscribe","user_id":1}```
    - Cliquez sur le bouton "Send" pour inscrire l'utilisateur #1. L'inscription permet à l'utilisateur de recevoir par la suite des messages lorsque le statut d'une de ses tâches évolue (le serveur ws trie les destinataires des messages envoyés en fonction de leur id).

#### (suite) Avec client web ou Postman

- Effectuez une requête HTTP Patch sur l'URL <http://localhost:3333/tasks/1> afin de mettre à jour le statut de la Task #1 dans la base de données, via l'API REST. Le body de la requête HTTP doit contenir les données suivantes au format JSON : `{"status":1}`

Exemple de requête HTTP réalisée avec curl, en ligne de commande :

```SH
curl --request PATCH --url <http://localhost:3333/tasks/1> --data '{"status":1}'
```

- La mise à jour du statut de la Task #1 déclenche l'ajout d'un message dans la queue "tasks_completed" du service "mq".
- Le service "ws" est abonné à la queue "tasks_completed". Lorsqu'un message est ajouté à la queue, le service "ws" récupère le message et à son tour émet un message à destination de ses abonnés via le protocole Websocket.

L'API REST peut être testée à l'aide du logiciel "Bruno" (cf. dossier /Bruno).

- La réalisation du scénario de test doit afficher des messages de logs dans le terminal :

- Réception de l'inscription de l'utilisateur #1 au serveur "ws" : `Subscribtion received : {"type":"subscribe","user_id":1}`
- Envoi du message au serveur "mq" par le service "api" : `Message published to "tasks_completed"`
- Lecture du message dans la queue "tasks_completed" de "mq" par le service "ws" :

```SH
Message received from MQ
{
  message: 'task 1 has been completed at Fri Feb 02 2024 20:55:23 GMT+0000 (Coordinated Universal Time)',
  task: {
    id: 1,
    user_id: 1,
    status: 1,
    content: 'Acheter du pain',
    createdAt: '2024-01-02T17:00:00.000Z',
    completedAt: '2024-02-02T20:54:23.000Z'
  }
}
```

- Les messages envoyés par le service "ws" doivent s'afficher dans l'interface de Postman si la connexion et l'inscription de l'utilisateur ont été effectuées.

--

!["Logotype Shrp"](https://sherpa.one/images/sherpa-logotype.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
