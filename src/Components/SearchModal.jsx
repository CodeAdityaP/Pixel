import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../Products.json';

function SearchModal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle product search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = Products.filter(product =>
        product.Productname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      // Navigate to the first result
      navigate(`/product/${searchResults[0].id}`);
      // Close modal
      closeModal();
    }
  };

  // Handle product click from search results
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    closeModal();
  };

  const closeModal = () => {
    const modalElement = document.getElementById('searchModal');
    if (modalElement) {
      const modal = window.bootstrap?.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
    setSearchQuery('');
  };

  return (
    <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="searchModalLabel">Search Products</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSearchQuery('')}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSearch}>
              <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Type product name to search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus 
                />
              </div>
              {searchResults.length > 0 && (
                <div className="search-results">
                  <h6 className="mb-2">Results:</h6>
                  <ul className="list-group">
                    {searchResults.map(product => (
                      <li 
                        key={product.id} 
                        className="list-group-item list-group-item-action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.Productname}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            onError={(e) => e.target.style.display = 'none'}
                          />
                          <div>
                            <div className="fw-semibold">{product.Productname}</div>
                            <div className="text-muted small">{product.price}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="alert alert-info mt-3">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
