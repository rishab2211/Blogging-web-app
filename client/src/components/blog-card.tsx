import Avatar from "./avatar";
import { BookmarkPlus, MoreHorizontal } from "lucide-react";

type Props = {
  user: {
    avatar: string;
    name: string;
  };
  post: {
    createdAt: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    duration: number;
    date: string;
  };
};

const BlogCard = ({ user, post }: Props) => {
  return (
    <div className="bg-white w-full sm:w-[75vw] lg:w-[60vw] rounded-2xl shadow-sm p-6 max-w-4xl mx-auto space-y-4 transition hover:shadow-md border border-gray-100">
      {/* Top Info Bar */}
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Avatar />
        <span className="font-medium text-gray-700">{user.name}</span>
        <span>·</span>
        <span>{post.date}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-4 items-start">
        <div className="col-span-3 space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {post.content}
          </p>
        </div>
        <div className="col-span-1 w-full">
          <img
            src="/thumbnail.jpg"
            alt="Thumbnail"
            className="w-full h-24 object-cover rounded-md border"
          />
        </div>
      </div>

      {/* Footer Bar */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex gap-3 items-center">
          {post.tags ? (
            post.tags?.map((tag, idx) => <Tag key={idx} name={tag} />)
          ) : (
            <></>
          )}
          <span className="text-xs">· {post.duration} min(s) read</span>
        </div>
        <div className="flex gap-2 items-center text-gray-600 cursor-pointer">
          <BookmarkPlus className="w-4 h-4" />
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

const Tag = ({ name }: { name: string }) => {
  return (
    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 text-xs">
      {name}
    </span>
  );
};
