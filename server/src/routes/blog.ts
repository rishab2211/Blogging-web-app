import {  PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_DB_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>();
// middleware
blogRouter.use("/*", async (c, next) => {

    const authHeader = c.req.header("Authorization") || "";
    const jwtPayload = await verify(authHeader, c.env.JWT_SECRET);
    if (jwtPayload.id) {

        c.set('userId', jwtPayload.id as string);
        await next();
    } else {

        // throw error
        c.status(401);
        return c.json({
            error: "Unauthorized"
        })
    }
})

//POST route to post any blog
blogRouter.post('/', async (c) => {

    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
            published: true,
        }
    })

    if (!post.id) {
        c.status(400);
        return c.json({
            message: "Post could not be created"
        })
    }


    return c.json({
        id: post.id
    });
});

//PUT route to make any change in the blog
blogRouter.put('/', async (c) => {

    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const updatePost = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    if(!updatePost.id){
        c.status(400);
        return c.json({
            message : "Post could not be updated"
        })
    }

    return c.text("Post updated");
});

// this route has to be above the route fetching post by id, else it will not work
blogRouter.get("/bulk",async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL
    }).$extends(withAccelerate());

    const allPosts = await prisma.post.findMany();

    if(!allPosts){
        c.status(404);
        return c.json({
            message : "Could not get all posts"
        })
    }

    return c.json(allPosts)
    
})


// //GET route to get any blog by ID
blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DB_URL
    }).$extends(withAccelerate());

    const getPost = await prisma.post.findUnique({
        where : {
            id
        }
    })

    if (!getPost) {
        c.status(404);
        return c.json({
            message: "Post not found"
        });
    }

    return c.json({
        message : "Post fetched successfully",
        title : getPost.title,
        content : getPost.content
    })

    
});
