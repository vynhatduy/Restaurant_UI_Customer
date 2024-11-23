import React, { useEffect, useState } from "react";
import axios from "axios";

const BanList = () => {
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_CLOUD_VPS_API}/Ban/all`;
    axios.get(apiUrl)
      .then((response) => {
        setBanList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu bàn:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (banList.length === 0) {
    return <p>Không có bàn nào.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {banList.map((ban) => (
        <div
          key={ban.maBan}
          className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
        >
          <img
            src={ban.hinhAnh}
            alt={`Hình ảnh của bàn ${ban.soBan}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold mb-2">Bàn: {ban.soBan}</h3>
          <p>Số chỗ ngồi: {ban.soChoNgoi}</p>
        </div>
      ))}
    </div>
  );
};

export default BanList;
