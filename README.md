# Q-bot-api

## Setup Instructions

initalise npm `npm init -y`

install typescript `npm install typescript --save-dev`

install dependencies `npm i knex mysql2 dotenv express @types/express @types/node rimraf`

create knexfile.ts `npx knex init -x ts`

create table `npx knex migrate:make <migration_file_name>`

migrate table to mysql database `npm run migrate` or `npx knex migrate:latest`

## Endpoints

| Method   | Endpoint (`http://localhost:8080`)    | Request Body                                                                             | Description                                       |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/accounts`                       | `/`                                                                                      | Retrieve list of all users                        |
| `GET`    | `/api/accounts/:discord_id`           | `/`                                                                                      | Retrieve all Riot and Steam accounts of the user  |
| `POST`   | `/api/accounts`                       | `{ discord_id: string, tag: string }`                                                    | Create a new user account                         |
| `GET`    | `/api/accounts/riot/is_duplicate`     | `{ discord_id: string , riot_id: string }`                                               | Return `true` if there's a duplicate Riot account |
| `POST`   | `/api/accounts/riot/add`              | `{ discord_id: string, riot_id: string, region: string, rank: string, active: boolean }` | Create a new Riot account                         |
| `POST`   | `/api/accounts/steam/add`             |                                                                                          |                                                   |
| `GET`    | `/api/accounts/riot/get/:discord_id`  | `/`                                                                                      | Retrieve all Riot accounts of the user            |
| `PATCH`  | `/api/accounts/riot/select`           | `{ discord_id: string , riot_id: string }`                                               | Set the selected Riot account active              |
| `GET`    | `/api/accounts/steam/get/:discord_id` | `/`                                                                                      | Retrieve all Steam accounts of the user           |
| `PATCH`  | `/api/accounts/steam/select`          | `{ discord_id: string , steam_id: string }`                                              | Set the selected Steam account active             |
| `DELETE` | `/api/accounts/riot/delete`           | `{ discord_id: string , riot_id: string }`                                               | Delete the selected Riot Account                  |
| `DELETE` | `/api/accounts/steam/delete`          | `{ discord_id: string , steam_id: string }`                                              | Delete the selected Steam Account                 |
