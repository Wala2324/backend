import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange, categories = [] }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');

  //  Optimized: Call `onFilterChange` only when state changes
  useEffect(() => {
    onFilterChange({ category, priceRange, searchTerm });
  }, [category, priceRange, searchTerm, onFilterChange]);

  const resetFilters = () => {
    setCategory('');
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
  };

  const isValidPriceRange =
    priceRange.min === '' || priceRange.max === '' || Number(priceRange.min) <= Number(priceRange.max);

  return (
    <div className="filters mb-4">
      <input
        type="text"
        placeholder="Sök produkter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-2"
      />

      

      <button onClick={resetFilters} className="btn btn-secondary mt-3">
        Reset filter
      </button>
    </div>
  );
};

export default Filters;
