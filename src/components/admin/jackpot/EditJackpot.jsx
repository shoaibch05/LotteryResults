import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJackpotById, updateJackpot } from "../../../api/jackpotApi";

const EditJackpot = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Jackpot_category: "",
    amount: "",
    draw_date: "",
    color: "red",
  });

  // Fetch Jackpot by ID
  useEffect(() => {
    const fetchJackpot = async () => {
      setLoading(true);
      try {
        const data = await getJackpotById(id);
        if (data && data.length > 0) {
          const jackpot = data[0];
          const formattedDate = jackpot.draw_date
            ? new Date(jackpot.draw_date).toISOString().slice(0, 16)
            : "";
          setFormData({
            Jackpot_category: jackpot.Jackpot_category || "",
            amount: jackpot.amount || "",
            draw_date: formattedDate,
            color: jackpot.color || "red",
          });
        }
      } catch (err) {
        console.error("Error fetching jackpot:", err);
        alert("Failed to load jackpot details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJackpot();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateJackpot(id, formData);
      alert("Jackpot updated successfully!");
      navigate("/admin/jackpots");
    } catch (err) {
      console.error("Error updating jackpot:", err);
      alert("Failed to update jackpot. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.Jackpot_category) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jackpot...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Jackpot</h1>
        <p className="text-gray-600 mt-1">
          Update jackpot details and settings
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Jackpot Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jackpot Category */}
            <div className="md:col-span-2">
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
                placeholder="Enter jackpot category"
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
                type="text"
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

        {/* Action Buttons */}
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
            {loading ? "Updating..." : "Update Jackpot"}
          </button>
        </div>
      </form>
    </div>
  );
});

EditJackpot.displayName = "EditJackpot";
export default EditJackpot;
