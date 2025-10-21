const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPost = async (data) => {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create Post");
  return res.json();
};
export const getPostById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);

  if (!response.ok) throw new Error("Failed to fetch post");

  return response.json(); // ✅ await here
};
export const getPostBycategory = async (category) => {
  const res = await fetch(`${API_BASE_URL}/posts/${category}`);
  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json();
};
export const getPrizeBreakDownByPost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/prize-breakdowns/${id}`);

  if (!response.ok) throw new Error("Failed to fetch breakdowns tables");

  const data = await response.json(); // ✅ await here

  return data;
};
export const getAllRecentsPosts = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/`);

  if (!res.ok) throw new Error("Failed to fetch lotteries");
  return res.json();
};
export const getAllcategories = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/category`);

  if (!res.ok) throw new Error("Failed to fetch lotteries");
  return res.json();
};
export const fetchNoOfcategories = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/category/n`);

  if (!res.ok) throw new Error("Failed to fetch lotteries");
  return res.json();
};
export const fetchNoOfposts = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/n`);

  if (!res.ok) throw new Error("Failed to fetch lotteries");
  return res.json();
};
export const updatePost = async (id, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};
