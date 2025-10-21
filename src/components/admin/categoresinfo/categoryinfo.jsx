import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditCategoryForm from "./EditCategoryForm";
import { getLotteryByName } from "../../../api/lotteryApi";

const CategoryInfoPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await getLotteryByName(categoryName);
        setCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, [categoryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {category && (
        <EditCategoryForm
          initialData={category}
          categoryId={category?.id}
          onClose={() => navigate("/admin/categoriesinfo")}
        />
      )}
    </div>
  );
};

export default CategoryInfoPage;
