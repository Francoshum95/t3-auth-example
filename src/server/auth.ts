import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db";
import bcrypt from 'bcrypt';
import { AuthUser, jwtHelper, tokenOneDay, tokenOnWeek } from "@/utils/jwtHelper";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  providers: [
    CredentialsProvider({
      id: "next-auth",
      name: "Login with email",
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              name: credentials?.username
            }
          });
  
          if (user && credentials){
            const validPassword = await bcrypt.compare(credentials?.password, user.password); 
  
            if (validPassword){
              return {
                id: user.id,
                name: user.name,
              }
            }
          } else if (!user && credentials){
            const isUser = await prisma.user.findFirst({
              where: {
                name: credentials.username
              }
            });

            if (!isUser){
              const hashPassword = await bcrypt.hash(credentials.password, 10);
              const newUser = await prisma.user.create({
                data: {
                  name: credentials.username,
                  password: hashPassword
                }
              })

              return {
                id: newUser.id,
                name: newUser.name
              }
            }
          }
        } catch(error){
          console.log(error)
        }
        return null
      },
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

    })
  ],
  callbacks: {
    async jwt({token, user, profile, account, isNewUser}){

      // credentials provider:  Save the access token and refresh token in the JWT on the initial login
      if (user){
        const authUser = {id: user.id, name: user.name} as AuthUser;

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() /1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() /1000 + tokenOnWeek;

        return {
          ...token, accessToken, refreshToken, accessTokenExpired, refreshTokenExpired,
          user: authUser
        }

      } else {
        if (token){
          // If the access token has expired, try to refresh it
          if (Date.now() /1000 > token.accessTokenExpired){
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken){
  
              const user = await prisma.user.findFirst({
                where: {
                  name: token.user.name
                }
              });

              if (user){
                const accessToken = await jwtHelper.createAcessToken(token.user);
                const accessTokenExpired = Date.now() /1000 + tokenOneDay;

                return {...token, accessToken, accessTokenExpired}
              } 
            }

            return {...token, error: "RefreshAccessTokenError"}
          }
        }
      }

      return token
    },

    async session({ session, token }){
      if (token){
        session.user = {
          name: token.user.name,
          userId: token.user.id
        }
      }
      session.error = token.error;
      return session;
    }
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};



