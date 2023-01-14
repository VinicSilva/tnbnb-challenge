# Simplified banking system - informations
## Gettings Started
It's need to install in your computer:
`Docker: 18.06.0+`
`Docker-compose: 1.27.0+`

## Backend Framework
- [Laravel](https://laravel.com/)
## Frontend Framework
- [Vue 3](https://vuejs.org/)
- [Quasar](https://quasar.dev/)
## Database
- MySQL

`> I separated the frontend and backend part. Because of this, there are two folders: back and front. In this way, I explain how to run each of the projects that have Docker configured.`

<br>

# Backend

Execute these commands to start the application:
```bash
// Create the .env file
cp .env.example .env
// Start all containers docker
docker-compose up -d
// Enter in container
make bash
// Generate the key
php artisan key:generate
// It's everything!
// You can access the api in: http://localhost:8040
```

### Migrations
```bash
// Drop/Create migrations with seeds
php artisan migrate:fresh --seed
// Install database without datas
php artisan migrate:fresh
```

# Frontend

Execute these commands to start the application:
```bash
// Create the .env file
cp .env.example .env
// Change the field value from .env with the command below
BASE_API_URL='http://127.0.0.1:8040'
// Start all containers docker
docker-compose up -d
// It's everything!
// You can access the api in: http://localhost:80
```

# Credentials to sign in of Administrator:

Link of the system: [https://bankbnb.scorpionvnc.tk](https://bankbnb.scorpionvnc.tk)

```bash
email: admin@bnb.com
password: 123456
```

# Points of system

1. Pattern repositories were used in the backend to isolate the data access layer.
2. We also used Laravel's Observers to call other business rules.
3. In the frontend, a translation part of the words contained in the system was implemented, being a more globalized product.
4. An encryption logic was also used to cache some data for the frontend to reuse during the application, in case it needed to transfer data from one screen to another.