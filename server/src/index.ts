import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    PRISMA_DB_URL: string,
    JWT_SECRET: string
  }
}>();

app.use("/*",cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

//GET route for home page
app.get("/", async (c) => {
  return c.text("hello to backend")
})

//Middleware implementation




export default app
