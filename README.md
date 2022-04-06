# 📚 Stack
The frontend of this app is a React app. The backend is an Express server connected to a Postgresql database.

## 🏞 Background
This project was built in 72 hours to earn my Z-Prefix as a Supra Coder in the Space Force. No joke!
https://supracoders.us/z-prefix

## 🥳 Fun stuff
This app uses bcrypt to hash passwords, so they're never stored in my database, and gives you a Token when you authenticate that allows you to conditionally render things on the site.

## 💿 Running this app locally
Fork this repo, as well as the backend, then clone them onto your machine.
Run npm i from the cloned directory on each repo, then run npm start.
https://github.com/joehoman/blog-backend
Make a .env file and set DATABASE_URL="postgres://postgres:docker@localhost:5432/blog" and
JWT_SECRET=secret123

### 🤓 Database Requirements
This application can be configured to use a PostgreSQL docker container.

1. Pull the PostgreSQL docker container.

    ``` docker pull postgres ```

2. Create volume, turn on container, log into container
    1.  ```mkdir -p $HOME/docker/volumes/postgres```

    2.  ```docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres```

    3. ```docker ps -a```

    4. Copy the container ID from the output

    5. ``` docker exec -it <PSQL-Container-ID> bash ```
3. Create a DB called " zork_db "

    ```dbcreate -U postgres blog```

