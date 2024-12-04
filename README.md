# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Danh sách các câu lệnh để thực thi với file Dockerfile:
1. Build Docker Image
Tạo một Docker image từ Dockerfile:`docker build -t restaurant_customer_ui .`
- `-t restaurant_customer_ui`: Gán tên cho Docker image (ở đây là restaurant_customer_ui).
- .: Chỉ định ngữ cảnh build (thư mục hiện tại).
2. Kiểm tra Docker Image đã tạo
Liệt kê tất cả các Docker images hiện có:`docker images`
3. Chạy Docker Container
Khởi chạy một container từ image vừa tạo:`docker run -p 5173:5173 restaurant_customer_ui`
- `-p 5173:5173`: Liên kết cổng 5173 trên máy host với cổng 5173 trong container (Vite mặc định chạy trên cổng này).
- `restaurant_customer_ui`: Tên Docker image.
4. Liệt kê các Container đang chạy
Xem danh sách các container đang hoạt động:`docker ps`
Xem toàn bộ container (kể cả đã dừng):`docker ps -a`
5. Dừng Container
Dừng một container đang chạy:`docker stop <CONTAINER_ID>`
- `<CONTAINER_ID>`: ID hoặc tên của container (lấy từ lệnh `docker ps`).
6. Xóa Container
Xóa container không còn cần thiết:`docker rm <CONTAINER_ID>`
7. Debug Bên Trong Container
Nếu cần kiểm tra hoặc debug trực tiếp bên trong container:

 1.1 Chạy container với quyền truy cập terminal:`docker run -it restaurant_customer_ui /bin/bash`
 1.2 Hoặc mở terminal vào container đang chạy:`docker exec -it <CONTAINER_ID> /bin/bash`
Trong container, bạn có thể chạy các lệnh như:`npm run dev`
8. Kiểm Tra Log
Xem log của container (hữu ích để debug lỗi):`docker logs <CONTAINER_ID>`
8. Sử dụng Docker Compose (Nếu có)
Nếu đã tạo file docker-compose.yml, bạn có thể thực thi các lệnh sau:

- Build và khởi chạy container:`docker-compose up --build`
- Chạy container (không build lại):`docker-compose up`
- Dừng các container đang chạy:`docker-compose down`
9. Xóa Docker Image
Nếu không cần image nữa, bạn có thể xóa:`docker rmi restaurant_customer_ui`
10. Dọn Dẹp Docker
Xóa tất cả container đã dừng:`docker container prune`
Xóa tất cả Docker images không cần thiết:`docker image prune -a`

* Nếu Dùng Docker Compose
Nếu đã tạo file docker-compose.yml, bạn có thể sử dụng các lệnh sau để quản lý container:
1. Build và Khởi Chạy Container:`docker-compose up --build`
2. Dừng Container:`docker-compose down`
3. Xem Log:`docker-compose logs`
4. Chạy trong Chế độ Nền:`docker-compose up -d`

### Tóm Tắt Quy Trình Thực Hiện
1. Build image:`docker build -t restaurant_customer_ui .`
2. Chạy container:`docker run -p 5173:5173 restaurant_customer_ui`
3. Debug nếu cần:
`docker logs <CONTAINER_ID>`
`docker exec -it <CONTAINER_ID> /bin/bash`
4. Dọn dẹp khi không sử dụng:
`docker stop <CONTAINER_ID>`
`docker rm <CONTAINER_ID>`
`docker rmi restaurant_customer_ui`

### Tại sao phải dùng docker
1. Tính nhất quán trong môi trường
Docker đảm bảo rằng ứng dụng của bạn sẽ chạy ổn định trên mọi môi trường (máy local, server, hoặc cloud).
Docker đóng gói toàn bộ ứng dụng, bao gồm hệ điều hành, thư viện, và các dependency, giúp loại bỏ lỗi do sự khác biệt giữa môi trường phát triển và môi trường sản xuất.
2. Dễ dàng triển khai
Với Docker, việc triển khai ứng dụng chỉ cần chạy một lệnh (docker run hoặc docker-compose up) mà không cần thiết lập lại môi trường thủ công.
Dễ dàng đóng gói và chia sẻ ứng dụng với người khác thông qua Docker image.
3. Khả năng mở rộng và quản lý container
Docker giúp bạn triển khai và quản lý nhiều ứng dụng hoặc microservices trên cùng một server một cách hiệu quả.
Dễ dàng scale các container theo nhu cầu của hệ thống (thêm hoặc giảm container).
4. Tăng hiệu quả phát triển
Phát triển ứng dụng trở nên nhanh chóng hơn vì Docker cho phép các nhà phát triển thiết lập môi trường chỉ trong vài phút.
Không cần cài đặt hoặc cấu hình các công cụ khác nhau trên máy local vì tất cả đã được định nghĩa trong Docker image.
5. Tích hợp tốt với CI/CD
Docker rất phù hợp cho các quy trình tích hợp liên tục (CI) và triển khai liên tục (CD).
Bạn có thể sử dụng Docker trong pipeline CI/CD để tự động hóa quá trình kiểm thử, build và triển khai ứng dụng.
6. Tiết kiệm tài nguyên
So với máy ảo (Virtual Machine), Docker container nhẹ hơn và sử dụng ít tài nguyên hệ thống hơn.
Nhiều container có thể chạy trên cùng một máy chủ mà không tốn nhiều CPU hoặc RAM.
7. Hỗ trợ dễ dàng rollback
Docker cho phép bạn quay lại phiên bản trước của ứng dụng chỉ bằng cách sử dụng Docker image cũ hơn.
Điều này rất hữu ích khi xảy ra lỗi trong phiên bản mới.
8. Độc lập với hệ điều hành
Ứng dụng chạy trong Docker container không phụ thuộc vào hệ điều hành của máy chủ.
Bạn có thể phát triển trên Windows nhưng triển khai trên Linux mà không cần lo về sự không tương thích.
9. Quản lý các microservices
Với Docker, bạn có thể chia nhỏ hệ thống thành các microservices độc lập.
Điều này giúp dễ dàng phát triển, kiểm tra, và triển khai từng phần của hệ thống.
10. Dễ dàng tích hợp và mở rộng
Docker có thể tích hợp với nhiều công cụ phổ biến như Kubernetes, Jenkins, GitLab CI/CD, và các dịch vụ cloud như AWS, Google Cloud, Azure.
Dễ dàng mở rộng để đáp ứng nhu cầu ứng dụng khi người dùng tăng lên.

### Khi nào nên dùng Docker?
Khi cần môi trường nhất quán giữa dev và production.
Khi làm việc trong nhóm với nhiều nhà phát triển.
Khi ứng dụng phức tạp và có nhiều thành phần (database, backend, frontend, cache...).
Khi muốn triển khai dễ dàng và nhanh chóng.