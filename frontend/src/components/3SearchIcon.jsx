import React, { useState, useRef, useEffect } from "react";

const SearchIcon = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false); // Control suggestion visibility
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted suggestion

  const dropdownRef = useRef(null); // Ref for the dropdown container
  const suggestionRefs = useRef([]); // Refs for suggestion items

  // Static suggestions for demo purposes
  const allSuggestions = ["BCom", "BSC_IT", "BA", "BAF", "BMM", "Bsc", "BMS"];

  // Handle toggling the expanded search box
  const handleClick = () => {
    setExpanded(!expanded); // Toggle the expanded state of the search box
    setIsSuggestionVisible(false); // Hide suggestions when the search box is collapsed
  };

  // Handle input changes and filter suggestions based on the input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Show suggestions only when there's a query
    if (value.trim()) {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsSuggestionVisible(true); // Show suggestions
    } else {
      setIsSuggestionVisible(false); // Hide suggestions if input is empty
    }

    setHighlightedIndex(-1); // Reset highlight when input changes
  };

  // Handle Enter key press to trigger search or selection
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // If there's a highlighted suggestion, select it
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const selectedSuggestion = suggestions[highlightedIndex];
        setQuery(selectedSuggestion);
        onSearch(selectedSuggestion);
      } else if (query.trim() !== "") {
        // Otherwise, trigger search with the current query
        onSearch(query);
      }
      setIsSuggestionVisible(false); // Hide suggestions
    } else if (e.key === "ArrowDown") {
      // Handle arrow down to highlight the next suggestion
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      // Handle arrow up to highlight the previous suggestion
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Scroll the highlighted suggestion into view
  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionRefs.current[highlightedIndex]) {
      suggestionRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Fill the input with the selected suggestion
    onSearch(suggestion); // Trigger search
    setIsSuggestionVisible(false); // Hide suggestions after selection
  };

  // Handle search icon click
  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query); // Trigger search when the search icon is clicked
      setIsSuggestionVisible(false); // Hide suggestions after search
    }
  };

  return (
    <div className={`search-container ${expanded ? "expanded" : ""}`}>
      <input
        type="text"
        name="searchStr"
        className="search-input"
        placeholder="Search for top colleges based on courses..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Listen for Enter, ArrowUp, and ArrowDown keys
        style={{
          width: expanded ? "300px" : "0", // Dynamically adjust width based on expanded state
          opacity: expanded ? "1" : "0", // Make the input visible when expanded
        }}
      />
      <div className="search-icon" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="icon"
        >
          <path d="M10 2a8 8 0 015.29 13.29l5.38 5.38-1.42 1.42-5.38-5.38A8 8 0 1110 2m0-2a10 10 0 100 20 10 10 0 100-20z" />
        </svg>
      </div>

      {/* Display suggestions */}
      {isSuggestionVisible && suggestions.length > 0 && (
        <div className="suggestions-container" ref={dropdownRef}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              ref={(el) => (suggestionRefs.current[index] = el)}
              className={`suggestion-item ${
                index === highlightedIndex ? "highlighted" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
