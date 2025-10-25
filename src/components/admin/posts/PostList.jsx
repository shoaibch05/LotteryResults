import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { getAllRecentsPosts } from "../../../api/postApi";

const PostList = memo(() => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteMessageType, setDeleteMessageType] = useState(""); // 'success' or 'error'

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

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    const statusClasses = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async (postId, close) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Remove post from local state
        setPosts(posts.filter((post) => post.id !== postId));

        setDeleteMessage("✅ Post deleted successfully!");
        setDeleteMessageType("success");

        // Close popup
        if (close) close();

        // Clear message after 3 seconds
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        const error = await response.json();
        setDeleteMessage(`❌ ${error.message || "Failed to delete post"}`);
        setDeleteMessageType("error");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleteMessage(`❌ Error: ${error.message}`);
      setDeleteMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "all" || post.status === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">
            Manage your lottery results and articles
          </p>
        </div>
        <Link
          to="/admin/posts/create"
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Create New Post
        </Link>
      </div>

      {/* Delete Message */}
      {deleteMessage && (
        <div
          className={`p-4 rounded-lg border-l-4 ${
            deleteMessageType === "success"
              ? "bg-green-50 border-green-500 text-green-900"
              : "bg-red-50 border-red-500 text-red-900"
          }`}
        >
          <p className="font-medium text-sm">{deleteMessage}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {post.author || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <Popup
                        trigger={
                          <button className="text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        }
                        modal
                      >
                        {(close) => (
                          <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Delete Post
                            </h3>
                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete "{post.title}"?
                              This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={close}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDelete(post.id, close)}
                                disabled={loading}
                                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                                  loading
                                    ? "bg-red-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                }`}
                              >
                                {loading ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            <p>No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
});

PostList.displayName = "PostList";

export default PostList;
