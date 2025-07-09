import ScaffoldingTable from './ScaffoldingTable';
import MaterialsTable from './MaterialsTable';

// The component now accepts 'onClearList' as a prop
function RightPanel({ activeTab, setActiveTab, scaffoldingList, cmList, onClearList }) {
  return (
    <div className="right-panel">
      <div className="print-header">
        <div className="logo-container">
          <img id="company-logo" src="/LOGO.png" alt="Company Logo" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div className="user-info-container">
          <label htmlFor="user-name">User Name:</label>
          <input type="text" id="user-name" placeholder="Enter User Name" />
        </div>
      </div>

      <div className="tab-buttons-container">
        <button
          className={`tab-button ${activeTab === 'scaffolding' ? 'active' : ''}`}
          onClick={() => setActiveTab('scaffolding')}
        >
          Scaffolding List
        </button>
        <button
          className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          Construction Materials List
        </button>
      </div>

      {activeTab === 'scaffolding' ? (
        <ScaffoldingTable items={scaffoldingList} />
      ) : (
        <MaterialsTable items={cmList} />
      )}

      <div className="notes-and-actions-container">
        <div className="notes-container">
          <div className="note-box">
            <label htmlFor="del-notes">DEL:</label>
            <textarea id="del-notes" rows="1"></textarea>
          </div>
          <div className="note-box">
            <label htmlFor="ret-notes">RET:</label>
            <textarea id="ret-notes" rows="1"></textarea>
          </div>
        </div>
        <div className="button-container">
          <button id="toggle-remove-btn">Remove Items</button>
          {/* This button is now functional */}
          <button id="clear-list-btn" onClick={onClearList}>Clear List</button>
          <button id="print-list-btn">Print List</button>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;