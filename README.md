# T3-auth example

This repo was created with [create-t3-app](https://github.com/t3-oss/create-t3-app) and includes the following technologies:: 
- TypeScript
- Next.js
- tRPC
- Tailwind CSS
- NextAuth.js
- Prisma


The repository includes a demo code for the following tutorial:

- Building a t3-app : A Step-by-Step Guide to NextAuth : [full tutorial](https://dev.to/franco00000/building-a-t3-app-a-step-by-step-guide-to-nextauth-pea)


## Setup
Clone 
```bash
git clone git@github.com:Francoshum95/t3-auth-example.git t3-auth
cd t3-auth
```

Install
```bash
yarn
```

add the environment variables required, see [.env.example](/.env.example) for reference
```bash
DATABASE_URL="mongodb+srv://YOUR_DB_URL"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your secret"
NEXTAUTH_SECRET="your secret"
```



