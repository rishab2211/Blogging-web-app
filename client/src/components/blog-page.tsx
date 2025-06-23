type Props = {
  title: string;
  time: string;
  content: string;
  user: {
    avatar: string;
    name: string;
    tagline: string;
  };
};

// { title, time, content, user }: Props

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
          What is Lorem Ipsum?
        </h1>
        <p className="text-sm text-neutral-500">Thursday, June 19th, 2025</p>
      </div>

      {/* Blog Content */}
      <div className="prose prose-neutral max-w-none">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book...
        </p>
        <p>
          Where does it come from? Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old...
        </p>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly
          believable...
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 bg-neutral-100 p-4 rounded-xl shadow-sm mb-8">
        <img
          src="https://avatars.githubusercontent.com/u/120011070"
          className="rounded-full h-12 w-12 object-cover"
          alt="Author Avatar"
        />
        <div>
          <p className="font-semibold text-neutral-800">Rishab Raj</p>
          <p className="text-sm text-neutral-600 max-w-sm">
            I build scalable pixel perfect solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
