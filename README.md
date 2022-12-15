# questionnaire
Coding Challenge from FoxBase 
By Jakub Naumowicz
## Project Setup
### Install Dependencies
```shell
npm install
```

### Start postgres database in docker container
```shell
docker run --name questionnaire-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15.1
```

### Generate database schema from prisma schema
```shell
npx prisma migrate dev --name init
```

### Add some example data to the database
```shell
npx prisma db seed
```

### Run the test
```shell
npm run test
```

### Run the server
```shell
npm run start
```
