import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

type User = {
  id: string;
  name: string;
  email: string;
  // add more fields based on your backend response
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setAuthenticated(true);
      } catch (err) {
        console.error("Auth verification failed:", err);
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return {
    user,
    loading,
    authenticated,
  };
};
