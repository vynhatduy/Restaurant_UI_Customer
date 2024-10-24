import React, {useEffect,useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import StarRating from './StarRating.jsx';
const ProductList = () => {

    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        // Hàm gọi API
        const apiUrl = `${import.meta.env.VITE_API_URL}/Products/All`;
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(apiUrl); 
                //const response = await fetch('https://restaurant-b6gudpazgfbjcvgn.centralus-01.azurewebsites.net/api/Products/All'); 
                const data = await response.json();
                setMenuItems(data); 
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems(); // Gọi hàm
    }, []);
    // Danh sách sản phẩm mẫu
    const products = [

        {
            idSanPham: 1,
            tenSanPham: 'Cơm Tấm',
            hinhAnh: 'https://via.placeholder.com/150',
            moTa: "Cơm Tấm ",  
            donGia: "100.000đ",
            soSao:"5.0",
            trangThai:true,
            loai:"Cơm"
        },
        {
            idSanPham: 2,
            tenSanPham: 'Cơm Tấm',
            hinhAnh: 'https://via.placeholder.com/150',
            moTa: "Cơm Tấm ",  
            donGia: "100.000đ",
            soSao:"5.0",
            trangThai:true,
            loai:"Cơm"
        },
        {
            idSanPham: 3,
            tenSanPham: 'Cơm Tấm',
            hinhAnh: 'https://via.placeholder.com/150',
            moTa: "Cơm Tấm ",  
            donGia: "100.000đ",
            soSao:"5.0",
            trangThai:true,
            loai:"Cơm"
        },
        {
            idSanPham: 4,
            tenSanPham: 'Cơm Tấm',
            hinhAnh: 'https://via.placeholder.com/150',
            moTa: "Cơm Tấm ",  
            donGia: "100.000đ",
            soSao:"5.0",
            trangThai:true,
            loai:"Cơm"
        },
        {
            id: 5,
            name: 'Cơm Tấm',
            address: 'Đà lạt',
            time: '9:00 AM - 9:00 PM',
            imageUrl: 'https://via.placeholder.com/150',
            price: "100.000đ",
        },
        {
            id: 6,
            name: 'Cơm Tấm',
            address: 'Đà lạt',
            time: '9:00 AM - 9:00 PM',
            imageUrl: 'https://via.placeholder.com/150',
            price: "100.000đ",
        },
        {
            id: 7,
            name: 'Cơm Tấm',
            address: 'Đà lạt',
            time: '9:00 AM - 9:00 PM',
            imageUrl: 'https://via.placeholder.com/150',
            price: "100.000đ",
        },
        {
            id: 8,
            name: 'Cơm Tấm',
            address: 'Đà lạt',
            time: '9:00 AM - 9:00 PM',
            imageUrl: 'https://via.placeholder.com/150',
            price: "100.000đ",
        },
    ];
    const handleDetailClick = (id) => {
        navigate(`/product/${id}`);
    };
    return (
        <div className="container mt-1">
            <div className="row">
                {menuItems.map((product) => (
                    <div className="col-md-3 mb-4"  key={product.idSanPham}>
                        <div className="card text-start shadow p-1 mb-5 bg-white rounded">
                            <img src={product.hinhAnh} className="card-img-top" alt={product.tenSanPham} height="150px" />
                            <div className="card-body" style={{ 
                                    padding: '1.5em'
                                }}>
                                <h5 className="card-title" style={{ 
                                    listStyle: 'none',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                >
                                {product.tenSanPham}
                                </h5>
                            </div>
                            <ul className="text-start" style={{ 
                                    padding: '0 1em'
                                }}>
                                <li className="list-group-item" style={{ 
                                    listStyle: 'none',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {product.moTa}
                                </li>
                                <li className="list-group-item fw-bold text-danger" style={{ listStyle: 'none' }}>
                                    {product.donGia}
                                </li>
                                <StarRating soSao={product.soSao} />
                            </ul>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-primary mx-4">Chọn</button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary mx-4"
                                    onClick={()=>handleDetailClick(product.idSanPham)}    
                                >Chi tiết</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
