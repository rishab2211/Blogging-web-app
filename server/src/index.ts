import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
    PRISMA_DB_URL: string,
    JWT_SECRET: string
  }
}>();

//GET route for home page
app.get("/", async (c) => {
  return c.text("hello to backend")
})

//Middleware implementation

app.use("/api/v1/blog/*", async (c, next) => {

  // getting authorization header, default value as empty string
  const header = c.req.header("Authorization") || "";

  // verifying with the help of JWT Secret
  const response = await verify(header, c.env.JWT_SECRET);

  // checking if the response is right and have id in it
  if (response.id) {

    // if exist then we will proceed with next functions
    next();
  } else {
    
    // throw error
    c.status(403);
    return c.json({
      error: "Unauthorized"
    })
  }
})

//POST route for signing up 
app.post('/api/v1/signup', async (c) => {

  //Making prisma client connection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_DB_URL, // Pick this from wrangler.json file
  }).$extends(withAccelerate());

  //getting body
  const body = await c.req.json();

  //Creating User in the DB
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })

  //generating JWT Token
  const token = await sign(
    { id: user.id },
    c.env.JWT_SECRET,
    'HS256');

  // returning info, with status code
  if (!user) {
    c.status(400);
    c.json({
      message: "User cannot be created"
    })
  }

  c.status(201);
  return c.json({
    name: user.name,
    email: user.email,
    password: user.password,
    id: user.id
  });
});


// POST route to signin
app.post('/api/v1/signin', async (c) => {

  //Making prisma client connection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_DB_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: jwt
  })

});

//POST route to post any blog
app.post('/api/v1/blog', (c) => {
  return c.text("This is post request to post blog");
});

//PUT route to make any change in the blog
app.put('/api/v1/blog', (c) => {
  return c.text("This is put request to post blog");
});


//GET route to get any blog by ID
app.get('/api/v1/blog/:id', (c) => {
  return c.text("This is get request to see blog");
});




export default app
