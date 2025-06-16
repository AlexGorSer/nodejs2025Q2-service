# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {https://github.com/AlexGorSer/nodejs2025Q2-service}
```

## Installing NPM modules

```
git checkout develop-part-3
```

```
npm install
```

## Docker run

remove db volumes from other students make sure they are not there to avoid conflicts between migrations

Create `.env` file and copy all lines from `.env.example`, or rename from `.env.example` to `.env` and save it.

For develop in docker container:
Creates a development version with its own commands and launch methods, in the line Docker commands description of all commands

After the application starts, migrations are loaded automatically from `typeorm/migrations/`

```
docker:dev
```

for product version:

```
docker:prod
```

for pull from docker-hub images

```
docker:img
```

check script for vulnerabilities scanning

```
docker:scout
```

For check logs in log task in `.env` file change from POSTGRES_HOST=home-library-data-base to POSTGRES_HOST=localhost
it start dev local version app with pg docker container.
all logs store in `logs` folder

```
docker:local
```

then run in another command sell

```
npm run start:dev
```

## Docker commands (only dev)

Docker commands: WARNING do not use docker commands in the prod version of docker, they are made for dev version

if you want to try these commands: before creating the container, in the folder typeorm/datasource.ts put migrationsRun: false,
and run:

```
docker:dev
```

then

```
docker:mig:run
```

then restart nest.js app

these commands were run inside docker and show logs in the local console

generate a new migration

```
docker:mig:gen
```

run migration

```
docker:mig:run
```

revert migration

```
docker:mig:revert
```

## Running application

Create `.env` file and copy all lines from `.env.example`, or rename from `.env.example` to `.env` and save it.

Then start application:

```
npm start
```

for develop

```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## API

To test API use Postman.
You can import all endpoints from doc api.yaml.
Documentation for import .yaml into Postman https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/
Also you can test all API from Swagger in http://localhost:4000/doc/.
Working only API from 'Home Library Service: Part 1'.

## API Routes

- Users (/user route)

  - example data:

    ```typescript
    interface User {
      id: string; // uuid v4
      login: string;
      password: string;
      version: number; // integer number, increments on update
      createdAt: number; // timestamp of creation
      updatedAt: number; // timestamp of last update
    }
    ```

  - `GET /user` - get all users

  - `GET /user/:id` - get single user by id

  - `POST/user` - create user

    - example data:

    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```

  - `PUT /user/:id` - update user's password:

    - example data:

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```

  - `DELETE /user/:id` - delete user

- Tracks (/track route)

  - example data:

  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
  ```

  - `GET /track` - get all tracks

  - `GET /track/:id` - get single track by id

  - `POST /track` - create new track

  - `PUT /track/:id` - update track info

  - `DELETE /track/:id` - delete track

- Artists (/artist route)

  - example data:

  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

  - `GET /artist` - get all artists

  - `GET /artist/:id` - get single artist by id

  - `POST /artist` - create new artist

  - `PUT /artist/:id` - update artist info

  - `DELETE /artist/:id` - delete album

- Albums (/album route)

  - example data:

  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
  ```

  - `GET /album` - get all albums

  - `GET /album/:id` - get single album by id

  - `POST /album` - create new album

  - `PUT /album/:id` - update album info

  - `DELETE /album/:id` - delete album

- Favorites

  - example data:

  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

  - `GET /favs` - get all favorites

  - `POST /favs/track/:id` - add track to the favorites

  - `DELETE /favs/track/:id` - delete track from favorites

  - `POST /favs/album/:id` - add album to the favorites

  - `DELETE /favs/album/:id` - delete album from favorites

  - `POST /favs/artist/:id` - add artist to the favorites

  - `DELETE /favs/artist/:id` - delete artist from favorites

## Testing

After application running open new terminal and enter:
in part 3 `npm run test` don't work,

```
npm run test:auth
```

For refresh test

```
npm run test:refresh
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
