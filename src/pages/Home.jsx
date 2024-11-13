import React from 'react';
import Servicecpn from '../components/Servicecpn';
import Aboutcpn from '../components/Aboutcpn';
import TieuDeMenu from '../components/TieuDeMenu';
import TeamStartcpn from '../components/TeamStartcpn';
import FeetBack from '../components/FeetBackcpn';
import ProductList from '../components/Productcpn'
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <div className="home">
        <Servicecpn></Servicecpn>
        <Aboutcpn></Aboutcpn>
        <TieuDeMenu></TieuDeMenu>
        <ProductList />
        <TeamStartcpn></TeamStartcpn>
        {/* <FeetBack></FeetBack> */}

      </div>

      <div className="fixed bottom-5 right-5">
        <button className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
          <NavLink to="/Cart">  <i class="fa-solid fa-cart-shopping text-2xl" ></i></NavLink>
        </button>
      </div>
    </div>
  );
};

export default Home;
