const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPrizeBreakdown = async (newRow, session, postId) => {
  // Prepare data - newRow already has draw_type from the table component
  const dataToSend = {
    ...newRow,
    post_id: postId,
    draw_type: session, // Ensure draw_type is set correctly
  };

  console.log("API: Creating prize breakdown:", dataToSend);

  const res = await fetch(`${API_BASE_URL}/prize-breakdowns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText);
    throw new Error(`Failed to create prize breakdown: ${errorText}`);
  }

  const result = await res.json();
  console.log("API: Created successfully:", result);
  return result;
};

export const updatePrizeBreakdown = async (updatedRow) => {
  console.log("API: Updating prize breakdown:", updatedRow);

  const res = await fetch(`${API_BASE_URL}/prize-breakdowns/${updatedRow.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedRow),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText);
    throw new Error(`Failed to update prize breakdown: ${errorText}`);
  }

  const result = await res.json();
  console.log("API: Updated successfully:", result);
  return result;
};

export const deletePrizeBreakdown = async (id) => {
  const res = await fetch(`${API_BASE_URL}/prize-breakdowns/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText);
    throw new Error(`Failed to delete prize breakdown: ${errorText}`);
  }

  console.log("API: Deleted successfully");
  return true;
};
