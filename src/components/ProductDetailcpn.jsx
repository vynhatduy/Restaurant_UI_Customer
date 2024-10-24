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
                <h1>{product.tenSanPham}</h1>
                <p>{product.moTa}</p>
                {/* Hiển thị loại sản phẩm nếu có thông tin, nếu không thì hiển thị "Không có thông tin" */}
                {product.loai ? <p>Loại: {product.loai}</p> : null}
                {/* Hiển thị giá sản phẩm */}
                <p>Giá: {product.donGia}</p>
                {/* Hiển thị thông tin chi tiết nếu có */}
                {product.moTaChiTiet && <p>Chi tiết: {product.moTaChiTiet}</p>}
                {/* Hiển thị số sao */}
                <StarRating soSao={product.soSao} />
                {/* Hiển thị trạng thái */}
                <p>Trạng thái: {product.trangThai ? "Có sẵn" : "Hết hàng"}</p>
            </div>
    );
};

export default ProductDetailcpn;
