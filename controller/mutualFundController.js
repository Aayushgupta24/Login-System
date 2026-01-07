import axios from "axios";

let cachedSchemes = null;

export const searchMutualFunds = async (req, res) => {
  try {
    const query = (req.query.q || "").toLowerCase();

    if (!query || query.length < 2) {
      return res.json([]);
    }

    // Cache all schemes (1-time fetch)
    if (!cachedSchemes) {
      const response = await axios.get("https://api.mfapi.in/mf");
      cachedSchemes = response.data;
    }

    // Filter locally
    const results = cachedSchemes
      .filter((scheme) =>
        scheme.schemeName.toLowerCase().includes(query)
      )
      .slice(0, 10); // limit dropdown size

    res.json(results);
  } catch (error) {
    console.error("MF search error:", error.message);
    res.status(500).json({ message: "MF search failed" });
  }
};
