import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogPage from "../components/blog-page";
import { BACKEND_URL } from "../config";

type BlogData = {
  title: string;
  content: string;
  createdAt: string;
  author: {
    avatar: string;
    name: string;
    tagline: string;
  };
};

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(res.data);
    } catch (err) {
      console.error("Failed to fetch blog", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!blog) return <div className="p-6 text-center">Blog not found.</div>;

  return (
    <div className="min-h-screen">
      <BlogPage
        title={blog.title}
        time={new Date(blog.createdAt).toDateString()}
        content={blog.content}
        user={{
          name: blog.author.name,
          tagline: blog.author.tagline,
        }}
      />
    </div>
  );
};

export default Blog;
