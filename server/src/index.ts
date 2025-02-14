import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';



const app = new Hono<{
  Bindings: {
    PRISMA_DB_URL: string
  }
}>();



app.post('/api/v1/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_DB_URL,
  }).$extends(withAccelerate());
  return c.text("This is post request for signup");
});

app.post('/api/v1/signin', (c) => {
  return c.text("This is post request for signin");
});

app.put('/api/v1/blog', (c) => {
  return c.text("This is put request to post blog");
});

app.post('/api/v1/blog', (c) => {
  return c.text("This is post request to post blog");
});

app.get('/api/v1/blog/:id', (c) => {
  return c.text("This is get request to see blog");
});




export default app
