import BlogCard from "../components/blog-card";
import WriteBlogNavbar from "../components/write-blog-navbar";
import { useBlogs } from "../hooks/use-blogs";

const Blogs = () => {
  const { loading, blogs, page, setPage, totalPages } = useBlogs();

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <WriteBlogNavbar showWriteBtn={true} />

      <main className="max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No blogs found.</div>
        ) : (
          blogs.map((blog: any) => (
            <BlogCard
            id={blog.id}
              key={blog.id}
              user={{
                name: blog.author?.name || "Anonymous",
                avatar: blog.author?.avatar || "/default-avatar.png",
              }}
              post={{
                title: blog.title,
                content: blog.content,
                tags: blog.tags || [],
                duration: blog.readTime || 3,
                date: blog.createdAt
                  ? new Date(blog.createdAt).toDateString()
                  : "Unknown Date",
                createdAt: blog.createdAt || "", // or a fallback if not present
              }}
            />
          ))
        )}

        {/* Pagination Controls */}
        {!loading && blogs.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Blogs;
