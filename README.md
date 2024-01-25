## start app with docker
```bash
$ cd docker
$ docker compose build
$ docker compose up
```

## MIGRATIONS
Migrations will be executed upon start of the docker container.

## Work with migrations
Commands must use exactly `npm run` because yarn doesn't support parameters

create new empty migration with name 'asdf'.
```bash
$ npm run migration:create --name=asdf
```

generate new migration  with name 'asdf' from schema changes.

```bash
$ npm run migration:g --name=asdf
```

Run all new migrations:
```bash
$ npm run migration:run
```

Revert last migration:
```bash
$ npm run migration:revert
```