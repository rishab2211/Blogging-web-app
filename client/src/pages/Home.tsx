import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
      <button
        onClick={() => {
          navigate("/signin");
        }}
      >
        Signin
      </button>
      <button
        onClick={() => {
          navigate("/blog");
        }}
      >
        blog
      </button>
    </div>
  );
};

export default Home;
