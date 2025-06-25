import { PenIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";


const WriteButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PenIcon
        onClick={() => {
          navigate("/blog/create");
        }}
      />
    </div>
  );
};

export default WriteButton;
