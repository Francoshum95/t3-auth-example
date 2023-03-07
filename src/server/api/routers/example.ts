import { z } from "zod";
import bcrypt from 'bcrypt';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

const user = {
  user: "test",
  password: "testing123"
}

export const exampleRouter = createTRPCRouter({
  create: publicProcedure.query(async ({ ctx }) => {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    await ctx.prisma.user.create({
      data: {
        name: user.user,
        password: hash
      }
    })

    return {status: true}

  } catch(error){
    console.log(error)
  }

    return {status: false}
  }),
  secret: protectedProcedure.query(() => {
    return {secret: "test is secret"};
  })

});
