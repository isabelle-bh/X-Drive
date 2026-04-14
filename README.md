This is a simple, custom CRM for X Tronics Inc. 

## roadmap:
- 
- Email syncing (POP3)
- 

## tools used:
**Languages:** Typescript, Typescript-JSX, CSS
**Framework:** Next.js (React UI, Node.js runtime on server)
**Database:** PostgreSQL (hosted on Railway)
**ORM:** Prisma (to map db -> JS objects)

## setup: 

### install dependencies
`npm install`

### environment variables:
Place .env file inside x-drive-crm with following variables:
`DATABASE_URL`

### run database
`npx prisma migrate dev`
`npx prisma generate`

### start dev server
`npm run dev`

## notes
- users are created manually, there is no signup
- ensure DATABASE_URL is set in production

All rights reserved. 