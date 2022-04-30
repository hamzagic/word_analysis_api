**INSTALL**

Just run npm install.

**DB CONNECTION**

This project is connected to a private Postgres database. If you want to connect it to your own, just create a .env file with your credentials and run the migrations.

**AWS CONNECTION**

Add your own AWS credentials to the correspondent env keys.

**CREATE A MIGRATION**

npm run migrate create migration_name

**RUN A MIGRATION**

npm run migrate up

**ROLLBACK A MIGRATION**

npm run migration down

P.S.: you can run the migration adding the DB connection string to the command.
E.g.: DATABASE_URL=postgres://user:password@localhost:5432/dbname npm run migrate up

**START THE DEV SERVER**

npm run dev

**API DOCUMENTATION**

WIP - Swagger file.

