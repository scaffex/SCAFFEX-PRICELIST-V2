// The component now receives props for all filter states
function SearchPanel({
  isLoading,
  error,
  searchTerm,
  setSearchTerm,
  isExactMatch,
  setIsExactMatch,
  typeFilter,
  setTypeFilter,
}) {
  const getPlaceholder = () => {
    if (isLoading) return 'Loading latest prices...';
    if (error) return 'Could not load prices.';
    return 'Enter item description, category, ID...';
  };

  return (
    <>
      <div className="left-panel-top-bar">
        <h1>Scaffolding & Material Price Lookup</h1>
      </div>
      <div className="search-section-container">
        <div className="search-label-actions">
          <label htmlFor="search-input">Search Items:</label>
          <button className="subtle-button">View Full List</button>
        </div>
        <input
          type="text"
          id="search-input"
          placeholder={getPlaceholder()}
          disabled={isLoading || !!error}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="toggle-container">
          {/* This is now a controlled component */}
          <input
            type="checkbox"
            id="exact-match-toggle"
            checked={isExactMatch}
            onChange={(e) => setIsExactMatch(e.target.checked)}
          />
          <label htmlFor="exact-match-toggle">
            Exact Code Search (Match Case)
          </label>
        </div>
        <div className="item-type-filter-container">
          <label className="filter-group-label">Filter by Type:</label>
          <div className="radio-group">
            {/* These are now controlled components */}
            <input
              type="radio"
              id="filter-all"
              name="item-type-filter"
              value="all"
              checked={typeFilter === 'all'}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            <label htmlFor="filter-all">All</label>
            <input
              type="radio"
              id="filter-scaffolding"
              name="item-type-filter"
              value="scaffolding"
              checked={typeFilter === 'scaffolding'}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            <label htmlFor="filter-scaffolding">Scaffolding</label>
            <input
              type="radio"
              id="filter-cm"
              name="item-type-filter"
              value="construction materials"
              checked={typeFilter === 'construction materials'}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            <label htmlFor="filter-cm">Materials</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPanel;
