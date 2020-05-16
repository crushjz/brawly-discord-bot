# Brawly

WIP

## Development

- Install dependencies with `npm install`
- Run discord bot with `npm run nx serve discord-bot`
- Run the admin management interface with `npm run nx serve admin`

To create a new `nx` lib, use `npm run nx g @nrwl/workspace:lib libname`

## Database

```
docker volume create brawly-postgres
docker run --rm --name brawly-postgres  -e POSTGRES_PASSWORD=brawly  -v brawly-postgres:/var/lib/postgresql/data -d -p 5432:5432 postgres
```
