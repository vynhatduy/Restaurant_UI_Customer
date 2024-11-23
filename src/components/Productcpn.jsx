import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating.jsx';
import './style.css';

const ProductList = () => {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('NMA001'); // Mặc định nhóm món ăn là "NMA001"

    // Dữ liệu nhóm món ăn tĩnh
    const staticCategories = [
        { maNhomMonAn: 'NMA001', tenNhomMonAn: 'Bữa sáng' },
        { maNhomMonAn: 'NMA002', tenNhomMonAn: 'Bữa trưa' },
        { maNhomMonAn: 'NMA003', tenNhomMonAn: 'Bữa tối' },
    ];

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_CLOUD_VPS_API}/MonAn/all/food`;
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Expected JSON but got something else");
                }

                const data = await response.json();
                setMenuItems(data);
                setFilteredItems(data.filter(item => item.maNhomMonAn === 'NMA001'));
            } catch (error) {
                console.error("Error fetching menu items:", error);
                alert("Không thể tải danh sách món ăn. Vui lòng thử lại sau.");
            }
        };

        fetchMenuItems();
    }, []);

    // Hàm lọc món ăn theo nhóm
    const handleCategoryChange = (categoryCode) => {
        setSelectedCategory(categoryCode);
        setFilteredItems(menuItems.filter(item => item.maNhomMonAn === categoryCode));
    };

    // Hàm điều hướng tới trang chi tiết món ăn
    const handleDetailClick = (id) => {
        navigate(`/product/${id}`);
    };

    // Kiểm tra nếu danh sách món ăn rỗng
    const renderMenuItems = () => {
        if (filteredItems.length === 0) {
            return <div className="alert alert-warning" role="alert">Hiện tại món ăn không khả dụng</div>;
        }

        return (
            <div className="container mt-1">
                <div className="row">
                    {/* Hiển thị nhóm món ăn ở phía trên */}
                    <div className="col-12 mb-4 text-center">
                        <div className="btn-group" role="group" aria-label="Categories">
                            {staticCategories.map((category) => (
                                <button
                                    key={category.maNhomMonAn}
                                    type="button"
                                    className={`btn ${selectedCategory === category.maNhomMonAn ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleCategoryChange(category.maNhomMonAn)}
                                >
                                    {category.tenNhomMonAn}
                                </button>
                            ))}
                        </div>
                    </div>
        
                    {/* Hiển thị món ăn theo nhóm đã chọn */}
                    <div className="row justify-content-center">
                        {filteredItems.map((product) => {
                            const imageUrl = product.hinhAnh ? product.hinhAnh.split(';')[0] : 'default-image-url.jpg';
                            return (
                                <div className="col-md-3 mb-4" key={product.maMonAn}>
                                    <div className="card text-center shadow mb-5 bg-white rounded" style={{ padding: '6px 6px 20px' }}>
                                        <div className="img-hover-zoom">
                                            <img src={imageUrl} className="card-img-top" alt={product.tenMon || 'Hình ảnh món ăn'} height="150px" />
                                        </div>
                                        <div className="card-body" style={{ padding: '1.5em' }}>
                                            <h5 className="card-title" style={{
                                                listStyle: 'none',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {product.tenMon || 'Tên món ăn chưa được cung cấp'}
                                            </h5>
                                        </div>
                                        <ul className="text-start" style={{ padding: '0 1em' }}>
                                            <li className="list-group-item" style={{
                                                listStyle: 'none',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {product.moTa || 'Không có mô tả'}
                                            </li>
                                            <li className="list-group-item fw-bold" style={{ listStyle: 'none' }}>
                                                <p>Giá: <span className="text-danger" style={{ fontSize: '32px' }}>
                                                    {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                </p>
                                            </li>
                                        </ul>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" className="btn btn-primary mx-2">Chọn</button>
                                            <button
                                                type="button"
                                                className="btn btn-primary mx-2"
                                                onClick={() => handleDetailClick(product.maMonAn)}
                                            >Chi tiết</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-1 justify-content-center">
            <div className="row">
                {/* Hiển thị nhóm món ăn ở phía trên
                <div className="col-12 mb-4">
                    <div className="btn-group" role="group" aria-label="Categories">
                        {staticCategories.map((category) => (
                            <button
                                key={category.maNhomMonAn}
                                type="button"
                                className={`btn ${selectedCategory === category.maNhomMonAn ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleCategoryChange(category.maNhomMonAn)}
                            >
                                {category.tenNhomMonAn}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* Hiển thị món ăn theo nhóm đã chọn */}
                {renderMenuItems()}
            </div>
        </div>
    );
};

export default ProductList;
