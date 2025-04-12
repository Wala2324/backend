import { Link } from 'react-router-dom';
import '@/Components/Styles/Home.css';

const HeroSection = ({ heroImage }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h4 className="hero-subtitle">WELCOME TO BMARKETO SHOP</h4>
        <h1 className="hero-title">
        It pays to be the first with the<span>BMARKETO SHOP!</span>
        </h1>
        <Link to="/products" className="btn btn-shop">SHOP NOW</Link>
      </div>
      <div className="hero-image">
        {heroImage ? (
          <img src={heroImage} alt="Exclusive Chair Collection" loading="lazy" />
        ) : (
          <div className="hero-image-placeholder">Loading...</div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
