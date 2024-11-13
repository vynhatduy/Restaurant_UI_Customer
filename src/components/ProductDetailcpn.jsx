import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import StarRating from './StarRating.jsx';

const ProductDetailcpn = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null); // State để lưu thông tin sản phẩm

    useEffect(() => {
        // Gọi API để lấy thông tin sản phẩm theo id
        const fetchProduct = async () => {
            const apiUrl = `${import.meta.env.VITE_API_URL}/Products/ById/${id}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]); // Gọi lại khi id thay đổi

    if (!product) return <h1>Đang tải...</h1>; // Hiển thị trong khi tải dữ liệu

    return (
            <div>
            <img src={product.hinhAnh} className="card-img-top" alt={product.tenSanPham} height="450px" />
            <div className="row">
                <div className="col-md-5">
                    <div className="bg-light p-3">
                        <h1>{product.tenSanPham}</h1>
                        {product.loai ? <p>Loại: {product.loai}</p> : null}
                        <StarRating soSao={product.soSao} />
                        <p>Giá: <span className="text-danger" style={{ fontSize: '43px' }}>
                            {product.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </p>
                        <div className="text-center mt-3">
                            <button className="btn btn-primary"
                                style={{
                                    marginTop: "40%",
                                    padding: "15px 60px",
                                    borderRadius:"15px"
                                }}
                            >Chọn </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="bg-light p-3">
                        {product.moTa && <p>Thành phần: {product.moTa}</p>}
                        {product.moTaChiTiet && <p>Chi tiết: {product.moTaChiTiet}</p>}
                        <p>Trạng thái: {product.trangThai ? "Có sẵn" : "Hết hàng"}</p>
                    </div>
                </div>
            </div>
                
            </div>
    );
};

export default ProductDetailcpn;
