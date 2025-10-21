import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { fetchCategories } from "../../api/categoriesApi";
import { getAllName } from "../../api/lotteryApi";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAllName();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin: Categories</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/admin/categoriesinfo/new")}
        >
          + Add New Category
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={`/admin/categoriesinfo/${category}`}
              className="text-blue-600 hover:underline"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminCategoriesPage;
