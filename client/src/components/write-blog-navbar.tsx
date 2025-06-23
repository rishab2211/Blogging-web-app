import { BellIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import Avatar from "./avatar";

type Props = {};

const WriteBlogNavbar = () => {
  const [isPublish, setIsPublish] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex gap-3 items-center">
          <img src="/blog.svg" alt="logo" className="h-8" />
          <span className="text-gray-600 italic">Draft in kirags</span>
          <span className="text-gray-500 font-medium">Saved</span>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsPublish(!isPublish)}
            className={cn(
              isPublish ? "bg-red-500" : "bg-green-500",
              "px-4 py-2 rounded-md text-white font-medium transition"
            )}
          >
            {isPublish ? "Unpublish" : "Publish"}
          </button>
          <MoreHorizontal className="text-gray-600 cursor-pointer" />
          <BellIcon className="text-gray-600 cursor-pointer" />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default WriteBlogNavbar;