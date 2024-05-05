import React, { useEffect, useState } from 'react';
import AverageRating from '../../components/AverageRating';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/products`;

    const fetchProducts = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, []);

  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/singleProduct/${productId}`);
  };

  const handleFilter = () => {
    let filteredProducts = allProducts;

    // Filter products based on selected category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter products based on entered price range
    if (minPrice && maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice));
    }

    return filteredProducts;
  };

  // Get unique categories from products
  const categories = [...new Set(allProducts.map(product => product.category))];
  
  return (
    <div className="container p-4 mt-2 mb-2 summary">
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-md-6 col-lg-4 m-2">
            <div className="card px-2 shadow">
              <h6 className="text-center m-0">Filter by</h6>
              <hr className='m-1' />
              <h6>Price:</h6>
              <div className="card-body p-0 mb-2">
                <form id="price-range-form">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="min-price" className="form-label">
                        Min price:{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="min-price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="max-price" className="form-label">
                        Max price:{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="max-price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className='mb-3 mt-0'>___ SHOP <i className="fa-solid fa-bag-shopping"></i> ___</h1>
      {loading ? (
        <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
      ) : (
        <>
        <div className="btn-group mb-3" role="group" aria-label="Categories">
  <button 
    type="button" 
    className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`} 
    onClick={() => setSelectedCategory('')}
    style={{ backgroundColor: selectedCategory === '' ? '#007bff' : 'transparent', color: selectedCategory === '' ? '#fff' : '#007bff' }}
  >
    All
  </button>
  {categories.map(category => (
    <button 
      key={category} 
      type="button" 
      className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`} 
      onClick={() => setSelectedCategory(category)}
      style={{ backgroundColor: selectedCategory === category ? '#007bff' : 'transparent', color: selectedCategory === category ? '#fff' : '#007bff' }}
    >
      {category}
    </button>
  ))}
</div>

          {/* Product cards */}
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {handleFilter().map((product) => (
              <div key={product._id} className="col mb-4">
                <div className="card h-100 shadow" onClick={() => handleCardClick(product._id)}>
                  <img
                    src={product.picture}
                    height={250}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p><AverageRating id={product._id} /></p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
                    </small>
                    <div>
                      <h5>
                        ₹ {product.price}
                        <p>₹ {product.mrp} /-</p>
                      </h5>
                      <span>Size: {product.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
