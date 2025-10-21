const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getLotteryBySlug = async (slug) => {
  const res = await fetch(`${API_BASE_URL}/lotteries/slug/?slug=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch lottery by slug");

  const data = await res.json();
  return data; // Assuming slug is unique and returns a single lottery
};
export const getAllName = async () => {
  const res = await fetch(`${API_BASE_URL}/lotteries/`);

  if (!res.ok) throw new Error("Failed to fetch lotteries");
  return res.json();
};

export const getLotteryByName = async (Name) => {
  const res = await fetch(`${API_BASE_URL}/lotteries/${Name}`);
  if (!res.ok) throw new Error("Failed to fetch lottery");
  return res.json();
};

export const createLottery = async (data) => {
  const res = await fetch(`${API_BASE_URL}/lotteries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create lottery");
  return res.json();
};
