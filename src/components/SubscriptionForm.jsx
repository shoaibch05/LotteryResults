import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";

const SubscriptionForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("❌ Invalid email address");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subscriber/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name }),
        }
      );

      if (response.ok) {
        setStatus("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("⚠️ Something went wrong.");
      }
    } catch {
      setStatus("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 text-center animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Get the latest lottery updates and results straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            placeholder="Enter your Name"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg transition ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-700 shadow-md"
            }`}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status && (
          <p className="text-sm text-gray-700 mt-4 transition-all duration-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm;
