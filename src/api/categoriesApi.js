const API_URL = import.meta.env.VITE_API_BASE_URL;

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/lotteries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw error;
  }
};
