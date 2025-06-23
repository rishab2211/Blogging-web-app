import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

// hono app initialization
const app = new Hono<{
  Bindings: {
    PRISMA_DB_URL: string,
    JWT_SECRET: string
  }
}>();

// cors middleware to allow access from all origins
app.use("/*",cors())

// handling user requests with userRouter
app.route("/api/v1/user",userRouter);

// handling blogs requests with blogRouter
app.route("/api/v1/blog",blogRouter);

// home page
app.get("/", async (c) => {
  return c.text("hello to backend")
})



export default app
