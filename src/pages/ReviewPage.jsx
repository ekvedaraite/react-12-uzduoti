import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

const ReviewPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:4000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error('Error fetching product details:', error));

    // Fetch reviews for the product
    fetch(`http://localhost:4000/reviews?productId=${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [productId]);

  const handleDeleteReview = async (reviewId) => {
    try {
      // Delete the review using your API endpoint
      await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      // Update the reviews state to trigger a re-render
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="review-page">
      {product ? (
        <h2>{product.title} reviews:</h2>
      ) : (
        <h2>Loading...</h2>
      )}
      {reviews.length > 0 ? (
        <div className="review-cards-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3>
                  {review.name} <FaCheckCircle className="checkmark-icon" />
                </h3>
                <div className="action-icons">
                  <FaTrashAlt
                    className="trash-icon"
                    onClick={() => handleDeleteReview(review.id)}
                  />
                </div>
              </div>
              <div className="rating">
                <span className="rating-label">Rating:</span>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < review.rating ? 'blue-star' : 'grey-star'}
                  />
                ))}
              </div>
              <h4>{review.title}</h4>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="noReviews">No reviews available for this product.</p>
      )}
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default ReviewPage;
