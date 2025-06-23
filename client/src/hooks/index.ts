import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/get-all?page=${page}`)
    }, [])

}