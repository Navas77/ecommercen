import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditPage.css';
import { backendUrl } from '../App';

function EditPage({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [editedProduct, setEditedProduct] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    subCategory: product?.subCategory || '',
    sizes: Array.isArray(product?.sizes) ? product.sizes.join(',') : product?.sizes || '',
    bestseller: product?.bestseller || false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedProduct({ ...editedProduct, [name]: checked });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        ...editedProduct,
        sizes: JSON.stringify(editedProduct.sizes.split(','))
      };

      const response = await axios.put(`${backendUrl}/api/product/update/${product._id}`, updatedProduct, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/'); // Redirect to the list page after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
    
    <div className="edit-page">
      <h2>Edit Product</h2>
      {product ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={editedProduct.description} onChange={handleInputChange}></textarea>
          </label>
          <label>
            Price:
            <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={editedProduct.category} onChange={handleInputChange} />
          </label>
          <label>
            SubCategory:
            <input type="text" name="subCategory" value={editedProduct.subCategory} onChange={handleInputChange} />
          </label>
          <label>
            Sizes:
            <input type="text" name="sizes" value={editedProduct.sizes} onChange={handleInputChange} />
          </label>
          <label>
            Bestseller:
            <input type="checkbox" name="bestseller" checked={editedProduct.bestseller} onChange={handleCheckboxChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>No product data available</p>
      )}
    </div>
    </>
  );
}

export default EditPage;


