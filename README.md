## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- [Deployment documentation](https://docs.nestjs.com/deployment)
- [Documentation](https://docs.nestjs.com)
- [Devtools](https://devtools.nestjs.com)

## NestJs tips:

- Project structure:
  user/
  ├── dto/ # GraphQL DTOs (InputTypes)
  │ ├── create-user.input.ts
  │ └── update-user.input.ts
  ├── models/ # GraphQL ObjectTypes
  │ └── user.model.ts
  ├── interfaces/ # Optional: shared TypeScript interfaces
  │ └── user.interface.ts
  ├── resolvers/ # GraphQL resolvers
  │ └── user.resolver.ts
  ├── services/ # Business logic, calls Prisma, etc.
  │ └── user.service.ts
  ├── user.module.ts # NestJS module definition

- @ObjectType() -> Defines GraphQL response -> What GraphQL returns
- @InputType() -> Defines GraphQL -> input What GraphQL receives
- DTO (class) Defines internal input Input validation (e.g. with class-validator)

## PRISMA Instructions

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

## PRISMA Commands!

1. Use npx prisma migrate dev --name [example-add-username-to-user] when making changes to a schema.
   If you're using migrate dev, it automatically runs prisma generate for you after the migration.
2. Commands

- migrate dev  
   Safe for Supabase Cloud?: ❌ No
  No Updates and resets DB immediately - dev only
- migrate dev --create-only
  Safe for Supabase Cloud?: ✅ Yes
  Prepares migration without touching the DB
- migrate deploy
  Safe for Supabase Cloud?: ✅ Yes
  Applies migrations to Supabase/production safely
