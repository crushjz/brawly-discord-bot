# Brawly

WIP

## Development

- Install dependencies with `npm install`
- Run discord bot with `npm run nx serve discord-bot`
- Run the admin management interface with `npm run nx serve admin`

To create a new `nx` lib package:

```
npx nx g @nrwl/workspace:lib libname
```

To create a new `nx` app package:

```
npx nx g @nrwl/node:app appname
```

### Database

Setup PostgreSQL with docker:

```
docker pull postgres
docker volume create brawly-postgres
docker run --name brawly-postgres  -e POSTGRES_USER=brawly -e POSTGRES_PASSWORD=brawly -v brawly-postgres:/var/lib/postgresql/data -d -p 5432:5432 postgres
```

Postgres connection: `postgresql://brawly:brawly@localhost:5432/brawly?schema=public`

### Database with prisma

Create a `.env` file containing the database connection next to the `schema.prisma` file

```
DATABASE_URL=postgresql://postgres:brawly@localhost:5432/brawly?schema=public
```

Create all the tables in the Database using [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/):

```
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental
```

Then run the prisma `instropect` and `generate` command to create the local models. These will be used also when updating the schema after a database change.

```
npx prisma introspect --schema=.\libs\database\src\prisma\schema.prisma
npx prisma generate --schema=.\libs\database\src\prisma\schema.prisma
```

Run [prisma studio](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-postgres#explore-the-data-in-prisma-studio-experimental), a database visual editor:

```
npx prisma studio --schema=.\libs\database\src\prisma\schema.prisma
```
