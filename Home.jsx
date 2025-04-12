import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import HeroSection from '../Components/HeroSection'
import CategoryFilter from '../Components/CategoryFilter'
import SubscriptionForm from '../Components/SubscriptionForm'
import '@/Components/Styles/Home.css'
import axios from "../api/axios"


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categorySearch, setCategorySearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(6);
  const [products, setProducts] = useState([])


  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('api/products')
      if(res.status !== 200) return 

        setProducts(res.data)
      }

      getProducts()
    
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };


  return (
    <div className="container">
      <HeroSection heroImage={products[3]?.images?.[1]} />
      <CategoryFilter
        categories={categories}
        categorySearch={categorySearch}
        setCategorySearch={setCategorySearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="product-section">
        <h2>Products</h2>
        <div className="product-list">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div 
              key={product._id} 
              className="product-card-wrapper" 
              onClick={() => handleProductClick(product._id)} 
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {visibleCount < filteredProducts.length && (
          <button onClick={handleLoadMore} className="btn btn-load-more">
            Load More
          </button>
        )}
      </section>

      <SubscriptionForm />
      <footer className="footer">
        <p>&copy; 2024 BMARKETO SHOP. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
