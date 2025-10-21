const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =========================
// Get All Jackpots
// =========================
export const getJackpots = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Problem while fetching jackpots", error);
    throw error;
  }
};

// =========================
// Get Latest Jackpot
// =========================
export const getLatestJackpot = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot/latest`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Problem while fetching latest jackpot", error);
    throw error;
  }
};

// =========================
// Get Latest Jackpot by Category
// =========================
export const getLatestJackpotByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jackpot/category/${category}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Problem while fetching jackpot by category", error);
    throw error;
  }
};

// =========================
// Get Jackpot by ID
// =========================
export const getJackpotById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Problem while fetching jackpot by ID", error);
    throw error;
  }
};

// =========================
// Create New Jackpot
// =========================
export const createJackpot = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log("Problem while creating jackpot", error);
    throw error;
  }
};

// =========================
// Update Jackpot
// =========================
export const updateJackpot = async (id, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log("Problem while updating jackpot", error);
    throw error;
  }
};

// =========================
// Delete Jackpot
// =========================
export const deleteJackpot = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jackpot/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Failed to delete jackpot: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.log("Problem while deleting jackpot", error);
    throw error;
  }
};
