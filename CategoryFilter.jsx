import '@/Components/Styles/Home.css';


const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <section className="category-section">
        <h2>Browse by Category</h2>
        <div className="filter-container">
          
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
  
          {/* Reset Button */}
          {selectedCategory && (
            <button className="btn-reset" onClick={() => setSelectedCategory('')}>
              Clear All
            </button>
          )}
        </div>
      </section>
    );
  };
  
  export default CategoryFilter;
  