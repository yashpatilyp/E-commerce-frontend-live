import React, { useEffect, useState } from 'react';

import AverageRating from '../../components/AverageRating';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container p-4 mt-2 mb-2 summary">
      <h1 className='mb-4'>___ SHOP <i className="fa-solid fa-bag-shopping"></i> ___</h1>
      {loading ? (
       <div className="text-center d-flex justify-content-center align-items-center" style={{height:"400px"}}>
       <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
       
     </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {allProducts.map((product) => (
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
                      {product.price}
                      <p>₹ {product.mrp} /-</p>
                    </h5>
                    <span>Size: M, L, XL</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
