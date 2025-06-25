import { BellIcon, MoreHorizontal } from "lucide-react";

import Avatar from "./avatar";
import WriteButton from "./write-button";
import { useNavigate } from "react-router-dom";

type Props = {
  text?: string;
  status?: string;
  showMoreBtn?: boolean;
  showNotificationBtn?: boolean;
  showWriteBtn?: boolean;
};

const WriteBlogNavbar = ({
  text,
  status,
  showMoreBtn,
  showNotificationBtn,
  showWriteBtn,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex gap-3 items-center">
          <img
            src="/blog.svg"
            alt="logo"
            className="h-8"
            onClick={() => navigate("/")}
          />
          {text && <span className="text-gray-600 italic">{text}</span>}
          {status && (
            <span className="text-gray-500 font-medium">{status}</span>
          )}
        </div>

        <div className="flex gap-3 items-center">
          {showWriteBtn && (
            <div>
              <WriteButton />
            </div>
          )}
          {showMoreBtn && (
            <MoreHorizontal
              aria-label="More options"
              className="text-gray-600 cursor-pointer"
            />
          )}
          {showNotificationBtn && (
            <BellIcon
              aria-label="Notifications"
              className="text-gray-600 cursor-pointer"
            />
          )}
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default WriteBlogNavbar;