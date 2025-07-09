function ScaffoldingTable({ items }) {
  // Calculate totals
  const rentalGrandTotal = items.reduce(
    (total, item) => total + item.rental_price * item.quantity,
    0
  );
  const saleGrandTotal = items.reduce(
    (total, item) => total + item.sale_price * item.quantity,
    0
  );

  return (
    <div id="scaffolding-list-content" className="tab-content active">
      <h2 id="scaffolding-price-list-title">Scaffolding Price List</h2>
      <div className="pricelist-container">
        <div className="table-wrapper">
          <table id="scaffolding-pricelist-table">
            <thead>
              <tr>
                <th className="remove-col"></th>
                <th className="qty-col">QTY</th>
                <th className="code-col">CODE</th>
                <th className="desc-col">DESCRIPTION</th>
                <th className="unit-rental-col">Unit Rental</th>
                <th className="total-rental-col">Total Rental</th>
                <th className="unit-sale-col">Unit Sale</th>
                <th className="total-sale-col">Total Sale</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="8">No scaffolding items added yet.</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="remove-col"></td>
                    <td className="qty-col">{item.quantity}</td>
                    <td className="code-col">{item.id}</td>
                    <td className="desc-col">{item.description}</td>
                    <td className="unit-rental-col">
                      ${item.rental_price?.toFixed(2) ?? '0.00'}
                    </td>
                    <td className="total-rental-col">
                      ${(item.rental_price * item.quantity).toFixed(2)}
                    </td>
                    <td className="unit-sale-col">
                      ${item.sale_price?.toFixed(2) ?? '0.00'}
                    </td>
                    <td className="total-sale-col">
                      ${(item.sale_price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="remove-col"></td>
                <td id="scaffolding-rental-label" colSpan="4">
                  Total Rental Price:
                </td>
                <td id="scaffolding-rental-grand-total">
                  ${rentalGrandTotal.toFixed(2)}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td className="remove-col"></td>
                <td id="scaffolding-sale-label" colSpan="6">
                  Total Sale Price:
                </td>
                <td id="scaffolding-sale-grand-total">
                  ${saleGrandTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScaffoldingTable;
