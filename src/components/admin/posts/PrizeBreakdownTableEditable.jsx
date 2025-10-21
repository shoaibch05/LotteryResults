import { memo } from "react";

const EditablePrizeTable = ({
  title,
  data,
  onCreateRow,
  onUpdateRow,
  onDeleteRow,
}) => {
  const handleCellChange = (index, key, value) => {
    const updatedRow = { ...data[index], [key]: value };
    // Pass the session type based on title
    const session = title.toLowerCase();
    onUpdateRow(index, updatedRow, session);
  };

  const handleAddRow = () => {
    const session = title.toLowerCase();
    const newRow = {
      category: "",
      winners: "",
      draw_type: session, // Add draw_type for backend
    };
    onCreateRow(newRow, session);
  };

  const handleDeleteRow = (index, id) => {
    const session = title.toLowerCase();
    if (window.confirm("Are you sure you want to delete this row?")) {
      onDeleteRow(index, id, session);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-md font-semibold mb-3 text-gray-800">
        {title} Prize Breakdown
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm mb-3">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-3 py-2 border">Category</th>
              <th className="px-3 py-2 border">Winners</th>
              <th className="px-3 py-2 border w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={row.id || idx} className="border-b hover:bg-gray-50">
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={row.category || ""}
                      onChange={(e) =>
                        handleCellChange(idx, "category", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Straight"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={row.winners || ""}
                      onChange={(e) =>
                        handleCellChange(idx, "winners", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 10"
                      min="0"
                    />
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(idx, row.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                      title="Delete row"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No entries. Click "Add Row" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleAddRow}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
        >
          + Add Row
        </button>
      </div>
    </div>
  );
};

export default memo(EditablePrizeTable);
