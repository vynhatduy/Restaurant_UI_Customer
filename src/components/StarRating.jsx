import React from 'react';
import './style.css'; // Nhớ import CSS nếu cần

const StarRating = ({ soSao }) => {
    const totalStars = 5; // Tổng số sao

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span 
                    key={index}
                    className={`star ${index < soSao ? 'filled' : ''}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
