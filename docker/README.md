# Running PostgreSQL with and Docker

### Make sure you have .env files setup!

1. **Build the containers**

```
   docker compose -p endangered --env-file .env -f docker/docker-compose.yml up --build
```

2 **Access the shell for the db with**

```
   docker exec -it language_app psql -U ${DB_USERNAME} -d endangered_db
```

3 **Seed the db**

```
\i /seeds/001_buryat_seeds.sql
\i /seeds/002_seed_users.sql
\i /seeds/003_seed_user_progress.sql
```

<!--
## For macOS/Linux Users

1. **Start Colima**
   Ensure Colima is running:

   ```bash
   colima start
   ```

2. **Pull the PostgreSQL Docker Image**
   Pull the desired PostgreSQL image:

   ```bash
   docker pull postgres:latest
   ```

Use this to run backend container separately

```
docker build -f ./back/Dockerfile --progress=plain -t verrakav/backendgo ./back
```

3. **Run the PostgreSQL Container**

### Once all in place this is the workflow that should work for dev work

the following command should be run from the docker folder only once:
--progress=plaim will log what's happening

```
   docker build --progress=plain -t verrakav/postgres .
```

if you delete the container completely -- not stopping but actually deleting -- you have to run it again

to correctly import .env into terminal session use the following command from the root of the project:

```
   docker compose --env-file .env -f docker/docker-compose.yml up --build
```

then in separate terminal run the command to access the db and paste:

```
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

if there is an error about dirty migrations use

```
UPDATE schema_migrations SET dirty = false WHERE version = 2;
or
UPDATE schema_migrations SET dirty = false, version = 2 WHERE version = 3;
```

Seeding the db

```
\i /seeds/001_seed_words.sql
\i /seeds/002_seed_users.sql
\i /seeds/003_seed_user_progress.sql
```

this command will stop the container but it WON'T wipe the volume:

```
   docker compose -f docker/docker-compose.yml down
```

These two should be enough. If for some reason we need to wipe the volume there's another command

to WIPE:
also helps when dirty_db errors:

```
    docker-compose down -v --remove-orphans
```

### Extra info

4. **Verify the Container is Running**
   Check the running containers:

   ```bash
   docker ps
   ```

5. **Connect to PostgreSQL**

   To access it in the terminal use:

   ```
   docker exec -it endangered_db psql -U vera -d endangered_db
   ```

6. **Stop the Container**
   To stop the PostgreSQL container:

   ```bash
   docker stop wd_db
   ```

7. **Remove the Container**
   If needed, remove the container:
   ```bash
   docker rm wd_db
   ```

## For Windows Users

1. **Install Docker Desktop**
   Ensure Docker Desktop is installed and running. Colima is not required on Windows.

2. **Pull the PostgreSQL Docker Image**
   Pull the desired PostgreSQL image:

   ```powershell
   docker pull postgres:latest
   ```

3. **Run the PostgreSQL Container**
   Start a PostgreSQL container:

   ```powershell
   docker run --name wd_db \
   -e POSTGRES_USER=username \
   -e POSTGRES_PASSWORD=password \
   -e POSTGRES_DB=endangered_db \
   -p 5432:5432 \
   -d postgres:latest

   ```

4. **Verify the Container is Running**
   Check the running containers:

   ```powershell
   docker ps
   ```

5. **Connect to PostgreSQL**
   The following command operates in the container, we don't need to specify ports

   ```powershell
   docker exec -it endangered_db psql -U may -d endangered_db
   ```

6. **Seed db**
   Use terminal to provide env once that's done run

   ```powershell
    go run seedingScript.go
   ```

7. **Stop the Container**
   To stop the PostgreSQL container:

   ```powershell
   docker stop wd_db
   ```

8. **Remove the Container**
   If needed, remove the container:
   ```powershell
   docker rm wd_db
   ```

(verifies it exists)
#4 (connects to the db inside the container)
#5 psql -U postgres (access the db as a user)

#\* docker volume prune (removes all unused volumes)


``` -->

## Step-by-step: Total NUKE of Colima Docker Environment

`docker stop $(docker ps -aq) ` # Stop all containers

`docker rm -f $(docker ps -aq) ` # Remove all containers

`docker volume rm $(docker volume ls -q) ` # Remove all volumes (deletes DB data)

`docker rmi -f $(docker images -q)` # Remove all images

`docker network rm $(docker network ls -q 2>/dev/null | grep -v "bridge\|host\|none") || true`

`docker system prune -a --volumes` # Totally nukes everything that's left

`colima stop colima delete` # The two will dispose of colima; Once done we're ready to start from the scratch

```

```
