# Q-bot-api

## Setup Instructions

initalise npm `npm init -y`

install typescript `npm install typescript --save-dev`

install dependencies `npm i knex mysql2 dotenv express @types/express @types/node rimraf`

create knexfile.ts `npx knex init -x ts`

create table `npx knex migrate:make <migration_file_name>`

migrate table to mysql database `npm run migrate` or `npx knex migrate:latest`

## Endpoints

| Method   | Endpoint                                                   | Request Body                              | Description |
| -------- | ---------------------------------------------------------- | ----------------------------------------- | ----------- |
| `GET`    | `http://localhost:8080/api/accounts`                       | /                                         |             |
| `GET`    | `http://localhost:8080/api/accounts/:discord_id`           | /                                         |             |
| `POST`   | `http://localhost:8080/api/accounts`                       | { discord_id: string, tag: string }       |             |
| `GET`    | `http://localhost:8080/api/accounts/riot/is_duplicate`     | { discord_id: string , riot_id: string }  |             |
| `POST`   | `http://localhost:8080/api/accounts/riot/add`              |                                           |             |
| `POST`   | `http://localhost:8080/api/accounts/steam/add`             |                                           |             |
| `GET`    | `http://localhost:8080/api/accounts/riot/get/:discord_id`  | /                                         |             |
| `PATCH`  | `http://localhost:8080/api/accounts/riot/select`           | { discord_id: string , riot_id: string }  |             |
| `GET`    | `http://localhost:8080/api/accounts/steam/get/:discord_id` | /                                         |             |
| `PATCH`  | `http://localhost:8080/api/accounts/steam/select`          | { discord_id: string , steam_id: string } |             |
| `DELETE` | `http://localhost:8080/api/accounts/riot/delete`           | { discord_id: string , riot_id: string }  |             |
| `DELETE` | `http://localhost:8080/api/accounts/steam/delete`          | { discord_id: string , steam_id: string } |             |
