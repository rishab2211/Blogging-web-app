import Avatar from "./avatar";

type Props = {
  title: string;
  time: string;
  content: string;
  user: {
    name: string;
    tagline: string;
  };
};

const BlogPage = ({ title, time, content, user }: Props) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
          {title}
        </h1>
        <p className="text-sm text-neutral-500">{time}</p>
      </div>

      {/* Blog Content */}
      <div className="prose prose-neutral max-w-none mb-10">
        {content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 bg-neutral-100 p-4 rounded-xl shadow-sm">
        <Avatar />
        <div>
          <p className="font-semibold text-neutral-800">{user.name}</p>
          <p className="text-sm text-neutral-600 max-w-sm">{user.tagline}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
