import React, { useRef, useEffect, useState, RefObject } from "react";

type Props = {};

const WriteBlogs = (props: Props) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Updated type annotation to accept null safely
  const autoResize = (ref: RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => autoResize(titleRef as any), [title]);
  useEffect(() => autoResize(contentRef as any), [content]);

  return (
    <div className="flex flex-col gap-4">
      <textarea
        ref={titleRef}
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-5xl font-bold px-2 pt-3 outline-none resize-none overflow-hidden placeholder:text-gray-400 leading-tight tracking-tight"
      />

      <textarea
        ref={contentRef}
        name="content"
        placeholder="Write your blog here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-lg leading-7 outline-none p-2 placeholder:text-gray-500 resize-none overflow-hidden min-h-[60vh]"
      />
    </div>
  );
};

export default WriteBlogs;
