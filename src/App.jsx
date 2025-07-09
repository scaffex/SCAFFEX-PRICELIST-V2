import { useState, useEffect } from 'react';
import SearchPanel from './components/SearchPanel';
import ResultsList from './components/ResultsList';
import RightPanel from './components/RightPanel';

function App() {
  // --- State Management ---
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scaffoldingList, setScaffoldingList] = useState([]);
  const [cmList, setCmList] = useState([]);
  const [activeTab, setActiveTab] = useState('scaffolding');
  const [isExactMatch, setIsExactMatch] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    const isDevelopment = import.meta.env.DEV;
    const dataUrl = isDevelopment
      ? '/MASTER_PRICE_LIST.json'
      : '/.netlify/functions/get-prices';
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // --- Filtering Logic ---
  console.log('App is rendering with typeFilter:', typeFilter); // <<< ADD THIS LINE
  const getFilteredItems = () => {
    if (typeFilter === 'all' && !searchTerm) {
      return [];
    }
    let results = allItems;
    if (typeFilter !== 'all') {
      results = results.filter(
        (item) => item.type?.toLowerCase() === typeFilter
      );
    }
    if (searchTerm) {
      if (isExactMatch) {
        results = results.filter((item) => item.id?.startsWith(searchTerm));
      } else {
        const term = searchTerm.toLowerCase();
        results = results.filter(
          (item) =>
            item.description?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term) ||
            item.id?.toLowerCase().includes(term)
        );
      }
    }
    return results;
  };
  const filteredItems = getFilteredItems();

  // --- Handler Functions ---
  const handleAddItem = (itemToAdd) => {
    const isScaffolding = itemToAdd.type?.toLowerCase() === 'scaffolding';
    const targetList = isScaffolding ? scaffoldingList : cmList;
    const setTargetList = isScaffolding ? setScaffoldingList : setCmList;
    setActiveTab(isScaffolding ? 'scaffolding' : 'materials');
    const existingItem = targetList.find((item) => item.id === itemToAdd.id);
    if (existingItem) {
      const newList = targetList.map((item) =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTargetList(newList);
    } else {
      setTargetList([...targetList, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const handleClearList = () => {
    const listName =
      activeTab === 'scaffolding'
        ? 'Scaffolding List'
        : 'Construction Materials List';
    if (
      window.confirm(`Are you sure you want to clear the entire ${listName}?`)
    ) {
      if (activeTab === 'scaffolding') {
        setScaffoldingList([]);
      } else {
        setCmList([]);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <SearchPanel
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isExactMatch={isExactMatch}
          setIsExactMatch={setIsExactMatch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        <ResultsList items={filteredItems} onAddItem={handleAddItem} />
      </div>

      <RightPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scaffoldingList={scaffoldingList}
        cmList={cmList}
        onClearList={handleClearList}
      />
    </div>
  );
}

export default App;
