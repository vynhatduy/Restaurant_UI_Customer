import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import Booking from '../pages/Booking';

const BookTable = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDecorationDialogOpen, setDecorationDialogOpen] = useState(false); // Trạng thái mở dialog trang trí
  const [tables, setTables] = useState([]); // Danh sách bàn từ API
  const [selectedTable, setSelectedTable] = useState(null); // Bàn được chọn
  const [selectedDecoration, setSelectedDecoration] = useState(null); // Mẫu trang trí được chọn
  const [decorations, setDecorations] = useState([]); // Danh sách mẫu trang trí
  const [isBirthdayTable, setIsBirthdayTable] = useState(false); // Kiểm tra có chọn bàn sinh nhật không

  // Thông tin khách hàng
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [request, setRequest] = useState(""); // Yêu cầu
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // Dialog thành công
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  // Trạng thái lỗi
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    date: "",
    time: "",
    guestCount: "",
  });

  // API URL
  const apiUrl = `${import.meta.env.VITE_CLOUD_VPS_API}`;

  // Fetch danh sách bàn
  const fetchTables = async () => {
    try {
      const response = await axios.get(apiUrl + "/Ban/all");
      setTables(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bàn:", error);
    }
  };

  // Fetch danh sách trang trí (chỉ khi chọn bàn sinh nhật)
  const fetchDecorations = async () => {
    try {
      const response = await axios.get(apiUrl + "/TrangTri/all");
      setDecorations(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách mẫu trang trí:", error);
    }
  };

  // Mở dialog bàn
  const openTableDialog = () => {
    fetchTables();
    setDialogOpen(true);
  };

  // Mở dialog trang trí
  const openDecorationDialog = () => {
    fetchDecorations();
    setDecorationDialogOpen(true);
  };

  // Đóng dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Đóng dialog trang trí
  const closeDecorationDialog = () => {
    setDecorationDialogOpen(false);
  };

  // Xử lý chọn bàn
  const handleSelectTable = (table) => {
    setSelectedTable(table);
    closeDialog();
  };

  // Xử lý chọn mẫu trang trí
  const handleSelectDecoration = (decoration) => {
    setSelectedDecoration(decoration);
    closeDecorationDialog();
  };

  // Chuyển giờ từ format HH:mm sang kiểu số nguyên
  const convertTimeToInt = (timeStr) => {
    const hour = parseInt(timeStr.split(":")[0]);
    return hour >= 9 && hour <= 20 ? hour : 9; // Giới hạn giờ từ 9 đến 20
  };

  // Xử lý gửi thông tin đặt bàn
  const handleSubmit = async () => {
    const newErrors = {
      phone: "",
      email: "",
      date: "",
      time: "",
      guestCount: "",
    };
    let isValid = true;

    // Kiểm tra số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại phải gồm 10 chữ số.";
      isValid = false;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Email không hợp lệ.";
      isValid = false;
    }

    // Kiểm tra ngày đặt không được là ngày trước đây
    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < currentDate) {
      newErrors.date = "Ngày đặt không thể là ngày trước hiện tại.";
      isValid = false;
    }

    // Kiểm tra giờ đặt chỉ trong khoảng từ 9h sáng đến 8h tối
    const gioDat = convertTimeToInt(time);
    if (gioDat < 9 || gioDat > 20) {
      newErrors.time = "Giờ đặt chỉ từ 9h sáng đến 8h tối.";
      isValid = false;
    }

    // Kiểm tra số lượng khách phải từ 1 đến 20
    const numGuests = parseInt(guestCount);
    if (numGuests <= 0 || numGuests >= 20) {
      newErrors.guestCount = "Số lượng khách phải lớn hơn 0 và nhỏ hơn 20.";
      isValid = false;
    }

    // Nếu có lỗi, cập nhật trạng thái lỗi và dừng lại
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Chuyển thời gian giờ sang kiểu số nguyên
    const bookingDetails = {
      laBanSinhNhat: isBirthdayTable,
      hoTen: name,
      email: email,
      sdt: phone,
      ngayDat: selectedDate.toISOString(),
      gioDat: gioDat,
      soNguoiThamGia: numGuests,
      yeuCau: request,
      maBan: selectedTable ? selectedTable.maBan : null,
      maTrangTri: isBirthdayTable && selectedDecoration ? selectedDecoration.maTrangTri : null,
    };

    console.log("Booking data", bookingDetails);

    try {
      const response = await axios.post(apiUrl + "/DatBan/create", bookingDetails);
      if (response.data.status) {
        setOpenSuccessDialog(true); // Mở dialog thành công
      } else {
        setOpenErrorDialog(true); // Mở dialog lỗi
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      setOpenErrorDialog(true); // Mở dialog lỗi nếu có lỗi xảy ra
    }
  };

  // Effect để load danh sách trang trí khi chọn bàn sinh nhật
  useEffect(() => {
    if (isBirthdayTable) {
      fetchDecorations();
    } else {
      setDecorations([]); // Nếu không chọn bàn sinh nhật, xóa danh sách trang trí
      setSelectedDecoration(null); // Reset trang trí đã chọn
    }
  }, [isBirthdayTable]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <Booking />
      <h1 className="text-4xl font-bold pb-9 text-center">ĐẶT BÀN ONLINE</h1>

      <form className="grid grid-cols-6 gap-6">
        {/* Thông tin khách hàng */}
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Chọn bàn */}
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">Chọn bàn</label>
          <button
            type="button"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 bg-blue-500 text-white"
            onClick={openTableDialog}
          >
            Chọn bàn
          </button>
        </div>

        {/* Chọn bàn sinh nhật */}
        <div className="col-span-6">
        Đặt bàn sinh nhật
          <label className="flex items-center">
            <input
              type="radio"
              name="birthday"
              checked={isBirthdayTable}
              onChange={() => setIsBirthdayTable(true)}
            />
            <span className="ml-2">Có</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="birthday"
              checked={!isBirthdayTable}
              onChange={() => setIsBirthdayTable(false)}
            />
            <span className="ml-2">Không</span>
          </label>
        </div>

        {/* Chọn mẫu trang trí khi bàn sinh nhật */}
        {isBirthdayTable && (
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Chọn mẫu trang trí</label>
            <button
              type="button"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 bg-blue-500 text-white"
              onClick={openDecorationDialog}
            >
              Chọn mẫu trang trí
            </button>
          </div>
        )}

        {/* Thêm các trường khác như ngày, giờ, số lượng khách */}
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Ngày đặt</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Giờ đặt</label>
          <input
            type="time"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">Số lượng khách</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
          />
          {errors.guestCount && <p className="text-red-500 text-sm">{errors.guestCount}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">Yêu cầu</label>
          <textarea
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
        </div>

        <div className="col-span-6 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Đặt bàn
          </Button>
        </div>
      </form>

      {/* Dialog chọn bàn */}
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth>
        <DialogTitle>Chọn Bàn</DialogTitle>
        <DialogContent>
          <div className="flex flex-wrap gap-4 justify-center"> {/* Sử dụng flexbox với flex-wrap */}
            {tables.map((table) => (
              <div
                key={table.maBan}
                className="flex flex-col items-center border rounded-lg p-4 hover:shadow-lg cursor-pointer"
                onClick={() => handleSelectTable(table)}
              >
                <img
                  src={table.hinhAnh}
                  alt={`Bàn ${table.soBan}`}
                  className="w-32 h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold">Bàn: {table.soBan}</h3>
                <p>Số chỗ ngồi: {table.soChoNgoi}</p>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog chọn trang trí */}
      <Dialog open={isDecorationDialogOpen} onClose={closeDecorationDialog}>
        <DialogTitle>Chọn mẫu trang trí</DialogTitle>
        <DialogContent>
          <div className="flex flex-wrap gap-2"> {/* Dùng flexbox và thêm khoảng cách */}
            {decorations.map((decoration) => (
              <div key={decoration.maTrangTri} className="flex items-center space-x-4 border p-2 rounded-lg">
                <img
                  src={decoration.hinhAnh} // Hình ảnh mẫu trang trí
                  alt={`Trang trí ${decoration.tenTrangTri}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span>{decoration.tenTrangTri}</span>
                  <span>{decoration.moTa}</span> {/* Mô tả mẫu trang trí */}
                </div>
                <Button
                  onClick={() => handleSelectDecoration(decoration)}
                  className="ml-auto"
                >
                  Chọn
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDecorationDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookTable;
