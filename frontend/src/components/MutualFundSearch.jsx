import { useState, useEffect, useRef } from "react";
import api from "../services/api";

function MutualFundSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchFunds();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchFunds = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/mutual-funds/search?q=${query}`
      );

      console.log("MF API response:", response.data);

      // Ensure array
      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("MF search error:", err);
      setError("Failed to fetch mutual funds");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (fund) => {
    setQuery(fund.schemeName);
    setResults([]);
  };

  return (
    <div style={{ position: "relative", maxWidth: "600px" }}>
      <input
        type="text"
        value={query}
        placeholder="Search mutual fund (e.g. HDFC, SBI)"
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "2px solid var(--border-color)",
        }}
      />

      {loading && (
        <div style={{ marginTop: "8px", color: "#666" }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ marginTop: "8px", color: "red" }}>
          {error}
        </div>
      )}

      {/* DROPDOWN */}
      {results.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "52px",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            maxHeight: "280px",
            overflowY: "auto",
            zIndex: 9999,
          }}
        >
          {results.map((fund) => (
            <div
              key={fund.schemeCode}
              onClick={() => handleSelect(fund)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "#f5f7ff")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "transparent")
              }
            >
              {fund.schemeName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MutualFundSearch;
