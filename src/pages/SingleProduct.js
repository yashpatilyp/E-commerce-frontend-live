import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import AddReview from "../components/AddReview";
import DisplayReviews from "../components/DisplayReviews";
import { useCart } from '../context/CartContext';
import AverageRating from "../components/AverageRating";
import { ToastContainer, toast } from "react-toastify";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();
  const authToken = localStorage.getItem('token');

  //................................{ Fetch Product Selected in Products.js}......................................................

  useEffect(() => {
    //  API endpoint for fetching products
    const apiUrl = `${API_BASE_URL}/api/products/${_id}`;

    
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSingleProduct(data);
        console.log(data);

      } catch (error) {
        console.error("Error fetching products:", error);

      }finally {
        setLoading(false);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, [_id]);

  //........................................................................................................................

  const [reviewAdded, setReviewAdded] = useState(false);

  //after adding addReview this functions is called and data is updated in AverageRating , DisplayRating components

  const handleReviewAdded = (count) => {
    setReviewAdded(!reviewAdded);
    
    console.log(`Total Reviews in SingleProduct: ${count}`);
  };

  const { dispatch } = useCart();
  const handleAddToCart = () => {
    // Dispatch ADD_TO_CART action with the current product data
    dispatch({ type: 'ADD_TO_CART', payload: singleProduct });
    toast.success('Product added to cart!',{ autoClose: 1000 });
  };
 
  return (
    <div>
      <ToastContainer/>
       {loading && (
        <div className="text-center mt-5">
          <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
          <p>Loading...</p>
        </div>
      )}
       {singleProduct && (
      <div className="d-flex flex-wrap p-5 m-2 singleProduct_container info">
  {/* Column 1: Image */}
  <div className="col-lg-4  mb-3 a">
    <div className="text-center ">
      <img
        src={singleProduct.picture}
        alt={singleProduct.name}
        className="img-fluid"
      />
    </div>
  </div>

  {/* Column 2: Name, Description, Price */}
  <div className="col-lg-4  mb-3 b">
    <div className="text-center product-single-heading">
      <div>
        <h3 className="container" >{singleProduct.name}</h3>
        <p>{singleProduct.description}</p>
       <AverageRating  id={_id} onReviewAdded={handleReviewAdded}/>
       
      </div>
      <div className="price-container">
        <h5>Price : ₹ {singleProduct.price}</h5>
        <p>Price : ₹ {singleProduct.price} /-</p>
      
        <span>Size: M, L, XL</span>
        <h6>Quantity  ({singleProduct.quantity})</h6>
      </div>
    </div>
  </div>

  {/* Column 3: Add to Cart Button */}
  
<div className="col-lg-4 mb-3 c">
  <div className="text-center productContainer">
    <h5>Price: ₹ {singleProduct.price}</h5>
    <div>
      <AverageRating id={_id} />
    </div>
    
    <h5>Status : In Stock </h5>
    <button className="btn btn-masterful" onClick={handleAddToCart}>
      <span className="icon">&#x1F680;</span>
      <span className="btn-txt">ADD TO CART!</span>
    </button>
  </div>
</div>
</div>
 )}
<DisplayReviews id={_id} onReviewAdded={handleReviewAdded} />
{authToken ? (
              <AddReview id={_id} onReviewAdded={handleReviewAdded} />
            ) : (
               <p></p>
            )}
        

    </div>
  );
}
