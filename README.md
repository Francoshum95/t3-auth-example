# T3-auth example

This repo was created with [create-t3-app](https://github.com/t3-oss/create-t3-app) and includes the following technologies:: 
- TypeScript
- Next.js
- tRPC
- Tailwind CSS
- NextAuth.js
- Prisma


The repository includes a demo code for the following tutorial:

- Building a t3-app : A Step-by-Step Guide to NextAuth : [full tutorial](https://dev.to/franco00000/step-by-step-guide-to-building-a-totp-feature-with-nextjs-1cbh?preview=82516a0511343c037c8bcb5a221ba46860580129392a8742dcd1a47c80a1f5bbc6d6d769afc9010c70ef57b6bd17a95577024d3ee7884f88ce587e46)


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



