import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJackpot } from "../../../api/jackpotApi";

const CreateJackpot = memo(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Jackpot_category: "",
    amount: "",
    draw_date: "",
    color: "red",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Creating Jackpot:", formData);
      const result = await createJackpot(formData);
      console.log("✓ Jackpot Created:", result);
      alert("Jackpot created successfully!");
      navigate("/admin/jackpots");
    } catch (error) {
      console.error("Error creating jackpot:", error);
      alert("Error creating jackpot. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Jackpot</h1>
        <p className="text-gray-600 mt-1">
          Add a new jackpot record for your lottery system
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Jackpot Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label
                htmlFor="Jackpot_category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Jackpot Category *
              </label>
              <input
                type="text"
                id="Jackpot_category"
                name="Jackpot_category"
                value={formData.Jackpot_category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Gold Jackpot"
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter jackpot amount"
              />
            </div>

            {/* Draw Date */}
            <div>
              <label
                htmlFor="draw_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Draw Date *
              </label>
              <input
                type="datetime-local"
                id="draw_date"
                name="draw_date"
                value={formData.draw_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Color
              </label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/jackpots")}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Jackpot"}
          </button>
        </div>
      </form>
    </div>
  );
});

CreateJackpot.displayName = "CreateJackpot";
export default CreateJackpot;
