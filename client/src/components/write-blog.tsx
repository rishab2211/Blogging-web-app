import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WriteBlogNavbar from "./write-blog-navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

const WriteBlog = () => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();

  const autoResize = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => autoResize(titleRef as any), [title]);
  useEffect(() => autoResize(contentRef as any), [content]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      setIsPublishing(true);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blogId = res.data.id;
      navigate(`/blog/${blogId}`);
    } catch (err) {
      console.error("Failed to publish blog:", err);
      alert("Something went wrong while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <WriteBlogNavbar
        text="Draft"
        status={isPublishing ? "Publishing..." : "Saved in Memory"}
        showMoreBtn={true}
        showNotificationBtn={false}
      />

      <textarea
        ref={titleRef}
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-5xl font-bold px-4 pt-3 outline-none resize-none overflow-hidden placeholder:text-gray-400 leading-tight tracking-tight"
      />

      <textarea
        ref={contentRef}
        name="content"
        placeholder="Write your blog here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-lg leading-7 outline-none p-4 placeholder:text-gray-500 resize-none overflow-hidden min-h-[60vh]"
      />

      <div className="flex justify-end px-6 pb-6">
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
