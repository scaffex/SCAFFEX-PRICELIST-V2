// The component now receives an 'onAddItem' function as a prop
function ResultsList({ items, onAddItem }) {
  if (items.length === 0) {
    return (
      <div className="results-container">
        <h2 className="search-results-title">Search Results</h2>
        <ul id="results-list">
          <li>No matching items found.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2 className="search-results-title">Search Results</h2>
      <ul id="results-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.type === 'scaffolding'
                ? 'item-type-scaffolding'
                : 'item-type-cm'
            }
          >
            <div className="item-details">
              <strong>{item.description || 'N/A'}</strong> (
              {item.category || 'N/A'})
              <small>
                ID: {item.id || 'N/A'} | Sale: $
                {item.sale_price?.toFixed(2) ?? 'N/A'}
                {item.type === 'scaffolding' &&
                  ` | Rent: $${item.rental_price?.toFixed(2) ?? 'N/A'}`}
                ({item.type || 'N/A'})
              </small>
            </div>
            <div className="item-actions">
              {/* This quantity input is not yet functional, we'll address it later */}
              <input
                type="number"
                className="result-quantity-input"
                defaultValue="1"
              />
              {/* When clicked, this button now calls the function from App.jsx */}
              <button className="add-button" onClick={() => onAddItem(item)}>
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsList;
