import React from "react";

const ListProductDetailcpm = () => {
  const products = [
    {
      idSanPham: 1,
      tenSanPham: 'Cơm Tấm',
      hinhAnh: 'https://via.placeholder.com/150',
      moTa: "Cơm Tấm thơm ngon",
      donGia: "100.000đ",
      soSao: "5.0",
      trangThai: true,
      loai: "Cơm"
    },
    {
      idSanPham: 2,
      tenSanPham: 'Cơm Tấm',
      hinhAnh: 'https://via.placeholder.com/150',
      moTa: "Cơm Tấm đặc sản",
      donGia: "100.000đ",
      soSao: "5.0",
      trangThai: true,
      loai: "Cơm"
    },
    {
      id: 5,
      name: 'Cơm Tấm',
      address: 'Đà lạt',
      time: '9:00 AM - 9:00 PM',
      imageUrl: 'https://via.placeholder.com/150',
      price: "100.000đ",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 d-flex mb-4" key={product.idSanPham || product.id}>
            <img src={product.hinhAnh || product.imageUrl} className="img-fluid rounded mr-3" alt={product.tenSanPham || product.name} />
            <div>
              <h5>{product.tenSanPham || product.name}</h5>
              <p>{product.moTa || `Địa chỉ: ${product.address}, Thời gian: ${product.time}`}</p>
              <p>Giá: {product.donGia || product.price}</p>
              <a href="#" className="btn btn-primary">Thêm vào giỏ hàng</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProductDetailcpm;
