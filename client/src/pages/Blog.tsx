import BlogCard from "../components/blog-card";
import WriteBlogNavbar from "../components/write-blog-navbar";

const Blog = () => {
  const user = {
    avatar: "user.png",
    name: "Peter V.",
  };

  const post = {
    createdAt: "string",
    title: "How an ugly looking website makes $5000 with affiliate marketing",
    content:
      "No need to create a fancy and modern website with hundreds of pages to make money online. Making money online is the dream for many...",
    thumbnail: "something.png",
    tags: ["Marketing", "Affiliate"],
    duration: 3,
    date: "Dec 3, 2023",
  };

  return (
    <div className="flex flex-col gap-6">
      <WriteBlogNavbar  /> 
      <div className="flex flex-col justify-center items-center gap-4  p-4 ">
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
        <BlogCard user={user} post={post} />
      </div>
    </div>
  );
};

export default Blog;
