function MaterialsTable({ items }) {
  // Calculate totals
  const saleGrandTotal = items.reduce((total, item) => total + (item.sale_price * item.quantity), 0);

  return (
    <div id="cm-list-content" className="tab-content active">
      <h2 id="cm-price-list-title">Construction Materials Price List</h2>
      <div className="pricelist-container">
        <div className="table-wrapper">
          <table id="cm-pricelist-table">
            <thead>
              <tr>
                <th className="remove-col"></th>
                <th className="qty-col">QTY</th>
                <th className="code-col">CODE</th>
                <th className="desc-col">DESCRIPTION</th>
                <th className="unit-sale-col">Unit Sale Price</th>
                <th className="total-sale-col">Total Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6">No construction materials added yet.</td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td className="remove-col"></td>
                    <td className="qty-col">{item.quantity}</td>
                    <td className="code-col">{item.id}</td>
                    <td className="desc-col">{item.description}</td>
                    <td className="unit-sale-col">${item.sale_price?.toFixed(2) ?? '0.00'}</td>
                    <td className="total-sale-col">${(item.sale_price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="remove-col"></td>
                <td id="cm-sale-label" colSpan="4">Total Sale Price:</td>
                <td id="cm-sale-grand-total">${saleGrandTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MaterialsTable;