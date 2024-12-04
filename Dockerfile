# Sử dụng Node.js phiên bản 18
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các file cần thiết vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng (dùng cho production)
RUN npm run build

# Cấp quyền truy cập vào cổng 5173 (cổng mặc định của Vite Preview)
EXPOSE 5173

# Lệnh chạy ứng dụng ở chế độ production
CMD ["npm", "run", "dev"]
