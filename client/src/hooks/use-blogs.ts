import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // or whatever your key is

      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/get-all?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res && res.data) {
        setBlogs(res.data.data || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  return { blogs, loading, page, setPage, totalPages };
};
