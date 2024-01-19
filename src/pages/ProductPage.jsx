// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReviewPage from './ReviewPage';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(''); // Default to no category filter
  const [sortingOrder, setSortingOrder] = useState('none'); // Default sorting order is none
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('http://localhost:4000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('No products data found in the response:', data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Apply filtering
    const filtered = products.filter((product) =>
      filteredCategory ? product.category === filteredCategory : true
    );

    // Apply sorting by price or ID
    const sorted = [...filtered]; // Create a copy to avoid mutating the original array

    if (sortingOrder === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortingOrder === 'desc') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  }, [products, filteredCategory, sortingOrder]);

  console.log('Products state:', products);
  console.log('Filtered category:', filteredCategory);
  console.log('Sorting order:', sortingOrder);
  console.log('Sorted products:', sortedProducts);

  return (
    <div className='productPageDiv'>
      
      <div className="filterDiv">
        <label htmlFor="category">Filter by category:</label>
        <select
          id="category"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="fitness">Fitness</option>
          <option value="gardening">Gardening</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
        </select>

        <label htmlFor="sortingOrder">Sort by price:</label>
        <select
          id="sortingOrder"
          value={sortingOrder}
          onChange={(e) => setSortingOrder(e.target.value)}
        >
          <option value="none">None</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      <div className="product-container">
        {sortedProducts && sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <h5>{product.category}</h5>
              <p>{product.price} €</p>
              <p>{product.description}</p>
              <button>
                <Link to={`/reviews/${product.id}`}>Show Reviews</Link>
                </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
