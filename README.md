X Drive is a simple, custom CRM. Features include tracking for contacts, organizations, leads, and opportunities, includes user account management (login, user sessions, admin vs user roles, permissions, etc).

## roadmap:
- User permission assignment
- Email syncing (POP3)

## tools used:
**Languages:** Typescript, Typescript-JSX, CSS <br>
**Framework:** Next.js (React UI, Node.js runtime on server) <br>
**Database:** PostgreSQL (hosted on Railway) <br>
**ORM:** Prisma (to map db -> JS objects) <br>

## setup: 

### install dependencies
`npm install`

### environment variables:
Place .env file inside x-drive-crm with following variables:<br>
`DATABASE_URL`

### run database
`npx prisma migrate dev`<br>
`npx prisma generate`

### start dev server
`npm run dev`

## notes
- users are created manually, there is no signup
- ensure DATABASE_URL is set in production

All rights reserved. 
