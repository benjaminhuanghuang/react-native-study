# Backend

- DB: drizzle + neondatabase + Neon DB

## Setup

```sh
npm init -y

npm i express cors dotenv cron

npm i @neondatabase/serverless

npm i drizzle-orm
npm i -D drizzle-kit

```

## DB

```sh
# Create migrations
npx drizzle-kit generate
# Apply migrations (create database schema)
npx drizzle-kit push
```
