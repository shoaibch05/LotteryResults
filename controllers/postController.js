import {
  getAllPosts,
  getPostById,
  getCat,
  getCatNum,
  getpostn,
  createPost,
  deletePost,
  updatePost,
  getLatestpostbycategory,
} from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getlatPostbyCat = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await getLatestpostbycategory(category);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await getCat();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
export const getCategoriesNum = async (req, res) => {
  try {
    const categories = await getCatNum();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
export const getPostsNumber = async (req, res) => {
  try {
    const categories = await getpostn();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
export const updatePostbyid = async (req, res) => {
  const { id } = req.params;
  const postData = req.body;

  try {
    // Basic validation
    if (!id) return res.status(400).json({ message: "Post ID is required" });

    // Call model function
    const result = await updatePost(id, postData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPost = async (req, res) => {
  const {
    title,
    category,
    status,
    date,
    MiddaywinningNumbers,
    EveningwinningNumbers,
    description,
    metaTitle,
    metaDescription,
  } = req.body;
  try {
    const newPost = await createPost(
      title,
      category,
      status,
      date,
      MiddaywinningNumbers,
      EveningwinningNumbers,
      description,
      metaTitle,
      metaDescription
    );
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removePost = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
