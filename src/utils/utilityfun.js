export const parseNumbers = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || parsed.length === 0) {
      return { numbers: [], bonusNumber: null };
    }

    const lastItem = parsed[parsed.length - 1];
    const isKeyValuePair = String(lastItem).includes(":");

    let numbers = [];
    let bonusNumber = null;

    if (isKeyValuePair) {
      // Last item is key-value pair, treat it as bonus
      numbers = parsed
        .slice(0, -1)
        .map((item) => {
          const num = parseInt(item);
          return isNaN(num) ? null : num;
        })
        .filter((num) => num !== null);

      // Extract number from key-value pair
      const match = String(lastItem).match(/:\s*(\d+)/);
      if (match) {
        bonusNumber = parseInt(match[1]);
      }
    } else {
      // Last item is NOT key-value pair, treat all as regular numbers
      numbers = parsed
        .map((item) => {
          const num = parseInt(item);
          return isNaN(num) ? null : num;
        })
        .filter((num) => num !== null);
    }

    return { numbers, bonusNumber };
  } catch (error) {
    console.error("Error parsing numbers:", error);
    return { numbers: [], bonusNumber: null };
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
