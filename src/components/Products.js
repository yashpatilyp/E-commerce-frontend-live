// Products.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { API_BASE_URL } from '../config';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define your API endpoint for fetching products
    const apiUrl = `${API_BASE_URL}/api/products`;

    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllProducts(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);

  // Slick settings for the carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        // Render a loading icon or spinner while data is being fetched
        <div className="text-center mt-5 mb-5">
          <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
          <p>Loading Products...</p>
        </div>
      ) : (
        <div className="container mt-4 mb-4">
          <h1 className="text-center">FEATURED PRODUCTS</h1>
          <div className="row p-4">
            <div className="col">
              <Slider {...slickSettings}>
                {allProducts.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
