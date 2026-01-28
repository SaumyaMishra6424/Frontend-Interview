import axios from "axios";
import type { Blog } from "../types/blog";

const API_URL = "http://localhost:3001";

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(`${API_URL}/blogs`);
  return res.data;
};

export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await axios.get(`${API_URL}/blogs/${id}`);
  return res.data;
};

export const createBlog = async (blog: Omit<Blog, "id">) => {
  const res = await axios.post(`${API_URL}/blogs`, blog);
  return res.data;
};
