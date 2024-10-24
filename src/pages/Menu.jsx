import React from 'react';
import TieuDeMenu from '../components/TieuDeMenu';
import ProductList from '../components/Productcpn';
import DetailList  from '../components/Detailcpn'
const Menu = () => {
    return (
        <div className="home">
            <TieuDeMenu/>
            <ProductList />
        </div>
    );
};

export default Menu;