import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


const app = new Hono<{
  Bindings: {
    PRISMA_DB_URL: string,
    JWT_SECRET: string
  }
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

//GET route for home page
app.get("/", async (c) => {
  return c.text("hello to backend")
})

//Middleware implementation




export default app
