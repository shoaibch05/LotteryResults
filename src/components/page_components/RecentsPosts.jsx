import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecentsPosts } from "../../api/postApi";

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Mock data (replace later with API call)
  const mockPosts = [
    {
      _id: "1",
      title: "New York Lotto Results - October 5, 2025",
      description:
        "Check the latest winning numbers and prize breakdown for the New York Lotto. See if you're one of the lucky winners!",
      category: "lotto",
      date: "2025-10-05",
      //   slug: "new-york-lotto-october-5-2025",
    },
    {
      _id: "2",
      title: "Powerball Results - October 5, 2025",
      description:
        "Discover the Powerball results and find out if anyone hit the jackpot this week. Explore detailed prize payouts here.",
      category: "powerball",
      date: "2025-10-05",
      //   slug: "powerball-october-5-2025",
    },
    {
      _id: "3",
      title: "Mega Millions Results - October 4, 2025",
      description:
        "Get the latest Mega Millions numbers and see the list of winning tickets across different states.",
      category: "megamillions",
      date: "2025-10-6",
      //   slug: "mega-millions-october-4-2025",
    },
  ];
  useEffect(() => {
    async function getPost() {
      try {
        const data = await getAllRecentsPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPost();
  }, []);

  if (!posts.length)
    return (
      <p className="text-center py-10 text-gray-500">Loading latest posts...</p>
    );

  return (
    <section className="py-10 bg-white shadow-md border-gray-200 rounded-md">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Latest Lottery Results
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.content}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    navigate(`/${post.category}/results/${post.date}`)
                  }
                  className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm transition"
                >
                  View More
                </button>
                <button
                  onClick={() => navigate(`/${post.category}/results`)}
                  className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm transition"
                >
                  View Past Results
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
