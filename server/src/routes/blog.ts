import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getPrisma } from "../utils/helper";

// bind the env variables and other vars for type safety(Typescript)
export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_DB_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>();

// /api/v1/blog/

// middleware
blogRouter.use("/*", async (c, next) => {

    // get auth header
    const authHeader = c.req.header("Authorization") || "";

    // Extract token from "Bearer <token>"
    const token = authHeader.replace("Bearer ", "").trim();

    // verify the auth header and set it
    const jwtPayload = await verify(token, c.env.JWT_SECRET);
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


// create post
blogRouter.post('/', async (c) => {

    // get userId
    const userId = c.get("userId");

    // connect to prisma client
    // get prisma connection pool url from wrangler.json
    const prisma = getPrisma(c.env.PRISMA_DB_URL);

    // get request body
    const body = await c.req.json();

    // create post in DB
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
            published: true,
        }
    })

    // could not create a post
    if (!post.id) {
        c.status(400);
        return c.json({
            message: "Post could not be created"
        })
    }

    // if created successfully
    return c.json({
        id: post.id
    });
});



// this route has to be above the route fetching post by id, else it will not work
blogRouter.get("/get-all", async (c) => {
  try {
    const prisma = getPrisma(c.env.PRISMA_DB_URL);

    const pageParam = c.req.query("page");
    const limit = 10;
    const page = Math.max(parseInt(pageParam || "1", 10), 1);

    const rawPosts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    // read time per post (90 words = 1 min)
    const posts = rawPosts.map((post) => {
      const wordCount = post.content?.split(/\s+/).filter(Boolean).length || 0;
      const readTime = Math.ceil(wordCount / 90);

      return {
        ...post,
        readTime,
      };
    });

    const totalPosts = await prisma.post.count();

    return c.json({
      data: posts,
      pagination: {
        total: totalPosts,
        page,
        limit,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (err) {
    c.status(500);
    return c.json({
      message: "Something went wrong",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});



// //GET route to get any blog by ID
blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id");

  const prisma = getPrisma(c.env.PRISMA_DB_URL);

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Tags: true,
        thumbnail: true,
        author: {
          select: {
            name: true,
            avatar: true,
            tagline: true,
          }
        }
      }
    });

    if (!post) {
      c.status(404);
      return c.json({
        message: "Post not found"
      });
    }

    return c.json(post);

  } catch (err) {
    console.error("Failed to fetch post:", err);
    c.status(500);
    return c.json({ message: "Internal Server Error", error: err });
  }
});



//PUT route to make any change in the blog
blogRouter.put('/:id', async (c) => {

    const userId = c.get("userId");

    const id = c.req.param("id");

    // connect to prisma client
    // get prisma connection pool url from wrangler.json
    const prisma = getPrisma(c.env.PRISMA_DB_URL);

    const body = await c.req.json();

    const updatePost = await prisma.post.update({
        where: {
            id: id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        },
        select: {
            title: true,
            id: true
        }
    });

    if (!updatePost.id) {
        c.status(400);
        return c.json({
            message: "Post could not be updated",
            data: updatePost
        })
    }

    return c.text("Post updated");
});

