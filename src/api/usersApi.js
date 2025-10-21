const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Problem while fetching Users", error);
    throw error;
  }
};
export const getAllSubs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/subs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.total_subscribers;
  } catch (error) {
    console.log("Problem while fetching subscribers count", error);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log("Problem while Updating Users", error);
    throw error;
  }
};

export const createUser = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/adduser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log("Problem while Creating Users", error);
    throw error;
  }
};
export const deleteUser = async (id) => {
  const res = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText);
    throw new Error(`Failed to delete User: ${errorText}`);
  }

  return true;
};
