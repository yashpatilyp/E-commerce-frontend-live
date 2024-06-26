import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, CLOUDINARY_CLOUD_NAME } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import { Image } from 'cloudinary-react';

export default function Product_Edit() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [picture, setPicture] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();

  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [imageSelected, setImageSelected] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    setImageSelected(true);
  };

  const uploadImageToCloudinary = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', picture);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setCloudinaryUrl(data.secure_url);
      console.log(data.secure_url);
      setImageSelected(false);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageSelected) {
      uploadImageToCloudinary();
    }
  }, [imageSelected]);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/products/${_id}`;

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSingleProduct(data);
        setProductName(data.name);
        setPrice(data.price);
        setMrp(data.mrp);
        setQuantity(data.quantity);
        setSize(data.size);
        setCategory(data.category);
        setPicture(data.picture);
        setDescription(data.description);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        name: productName,
        price,
        mrp,
        description,
        size,
        quantity,
        category, // Include the category in the update
        picture: cloudinaryUrl || picture,
      };

      const response = await fetch(`${API_BASE_URL}/api/products/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProductName('');
        setDescription('');
        setMrp('');
        setPicture('');
        setSize('');
        setQuantity('');
        setPrice('');
        setCategory('');
        toast.success('Product updated successfully!');
        navigate('/showproducts');
      } else {
        setLoading(false);
        toast.error('Failed to update product');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
        <form onSubmit={handleUpdate}>
          <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
            <div className="card m-3 shadow p-3">
              <h2 className="p-2 m-1">Edit Product</h2>
              <div className="card-body">
                <>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1"> Name</h6>
                    </div>
                    <input
                      type="text"
                      className="col-sm-8 text-secondary"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Price</h6>
                    </div>
                    <input
                      type="number"
                      className="col-sm-8 text-secondary"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">MRP</h6>
                    </div>
                    <input
                      type="number"
                      className="col-sm-8 text-secondary"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Decription</h6>
                    </div>
                    <input
                      type="text"
                      className="col-sm-8 text-secondary"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Picture</h6>
                    </div>
                    <input
                      type="file"
                      className="col-sm-8 text-secondary"
                      onChange={handleImageChange}
                    />
                  </div>

                  {loading && (
                    <div className="text-center p-2 m-4">
                      {' '}
                      <i className="fa fa-spinner fa-spin fa-2x " aria-hidden="true"></i>
                    </div>
                  )}
                  {cloudinaryUrl && (
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-1">Updated Image</h6>
                      </div>
                      <div className="col-sm-8">
                        <Image
                          src={cloudinaryUrl}
                          cloudName={CLOUDINARY_CLOUD_NAME}
                          width="100"
                          height="100"
                          crop="fill"
                          alt="Product Preview"
                        />
                      </div>
                    </div>
                  )}

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Quantity</h6>
                    </div>
                    <input
                      type="number"
                      className="col-sm-8 text-secondary"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Size</h6>
                    </div>
                    <select
                      className="col-sm-8 text-secondary"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Size
                      </option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Category</h6>
                    </div>
                    <input
                      type="text"
                      className="col-sm-8 text-secondary"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <button className="btn btn-info" type="submit">
                        Update Product
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
