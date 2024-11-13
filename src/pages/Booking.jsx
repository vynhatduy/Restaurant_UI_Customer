import React from 'react';
import { NavLink } from 'react-router-dom';
import BookTable from '../components/BookTableOnline';
const Booking = () => {
    return (
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 row ">
            <div className=' flex justify-center'>
                <NavLink to="/booktableonline"><button className="inline-block rounded-md px-4 py-2 text-sm font-bold text-gray-500 hover:bg-yellow-500 focus:relative" > Đặt bàn online </button></NavLink>
               <NavLink to= "/BookTableBirthday"><button className="inline-block rounded-md px-4 py-2 text-sm font-bold text-gray-500  hover:bg-yellow-500 focus:relative" >Đặt bàn sinh nhật </button></NavLink>
            </div>
            
        </div>
    );
};

export default Booking;