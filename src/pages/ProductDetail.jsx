import React from 'react';
import { useNavigate  } from 'react-router-dom';
import ProductDetailcpn from '../components/ProductDetailcpn';
import ListProductDetailcpm from '../components/ListProductDetailcpm';
const ProductDetail = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
    {/* Phần đầu với nút Back */}
    <div className="row mb-3">
        <div className="col-md-12">
            <div className="bg-light p-3 d-flex align-items-center">
                <button className="btn btn-primary me-2" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left"></i> {/* Icon back */}
                </button>
                <span>Back</span> {/* Nhãn back */}
            </div>
        </div>
    </div>
    
    {/* Phần giữa */}
    <div className="row">
        <div className="col-md-9">
            <div className="bg-light p-3">
                <ProductDetailcpn />
            </div>
        </div>
        <div className="col-md-3">
            <div className="bg-light p-3">
                <h2>Bên phải (3 phần)</h2>
            </div>
        </div>
    </div>

    {/* Phần dưới */}
    <div className="row mt-3">
        <div className="col-md-12">
            <div className="bg-light p-3">
                <ListProductDetailcpm/>
            </div>
        </div>
    </div>
</div>
)
};

export default ProductDetail;