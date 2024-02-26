# Q-bot-api

initalise npm `npm init -y`

install typescript `npm install typescript --save-dev`

install dependencies `npm i knex mysql2 dotenv express @types/express @types/node rimraf`

create knexfile.ts `npx knex init -x ts`

create table `npx knex migrate:make <migration_file_name>`

migrate table to mysql database `npx knex migrate:latest`
