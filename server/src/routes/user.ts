import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { getPrisma } from "../utils/helper";

export const userRouter = new Hono<{

    //specifying type bindings for environment variables
    Bindings: {
        PRISMA_DB_URL: string,
        JWT_SECRET: string
    }
}>();


//POST route for signing up 
userRouter.post('/signup', async (c) => {

    //Making prisma client connection
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL, // Pick this from wrangler.json file
    }).$extends(withAccelerate());

    //getting body from request
    const body = await c.req.json();

    //Creating User in the DB
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    })

    // if user cannot be created then return status 400 and message
    if (!user) {
        c.status(400);
        return c.json({
            message: "User cannot be created"
        })
    }

    //After successfully creating user in DB
    //generating JWT Token
    const token = await sign(
        { id: user.id },
        c.env.JWT_SECRET,
        'HS256');

    //user created successfully    
    c.status(201);
    return c.newResponse(token, { status: 201 })
});


// POST route to signin
userRouter.post('/signin', async (c) => {

    //Making prisma client connection
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL
    }).$extends(withAccelerate());

    //getting body from request
    const body = await c.req.json();

    //finding user with given info
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    //if user not found
    if (!user) {
        //return 403 and message
        c.status(403);
        return c.json({ error: "User does not exist" });
    }

    //if found generate jwt token and return
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);


    // Correct way to set headers
    return c.newResponse(token, { status: 200 });

});


userRouter.get("/me", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN : ",token);
  

  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    // const userId:string = decoded.userId as string;

    const userId: string = decoded.id as string;


    console.log("USER ID: ",userId);
    

    const prisma = getPrisma(c.env.PRISMA_DB_URL);

    const user = await prisma.user.findUnique({
      where: { 
        id : userId
       },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    return c.json(user);
  } catch (err) {
    console.error("Token verification failed:", err);
    c.status(401);
    return c.json({ message: "Invalid token" });
  }
});