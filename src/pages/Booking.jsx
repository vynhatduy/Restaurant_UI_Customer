import React from 'react';
import { NavLink } from 'react-router-dom';
import BookTable from '../components/BookTableOnline';
const Booking = () => {
    return (
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 row ">
            <BookTable/>
        </div>
    );
};

export default Booking;