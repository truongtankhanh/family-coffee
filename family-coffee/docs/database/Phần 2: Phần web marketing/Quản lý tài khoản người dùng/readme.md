Dưới đây là cấu trúc cơ sở dữ liệu cho chức năng quản lý tài khoản người dùng:

### Bảng "User_Accounts" (Tài khoản người dùng):

- **user_id**: Khóa chính, ID của người dùng (Unique).
- **username**: Tên đăng nhập của người dùng.
- **email**: Địa chỉ email của người dùng.
- **password**: Mật khẩu được mã hóa của người dùng.
- **full_name**: Họ và tên của người dùng.
- **address**: Địa chỉ của người dùng.
- **phone_number**: Số điện thoại của người dùng.
- **user_role**: Vai trò của người dùng (khách hàng, nhân viên, quản trị viên, v.v.).
- **created_at**: Thời điểm tạo tài khoản.
- **updated_at**: Thời điểm cập nhật thông tin tài khoản.

### Bảng "Order_History" (Lịch sử đặt hàng - nếu áp dụng):

- **order_id**: Khóa chính, ID của đơn hàng (Unique).
- **user_id**: ID của người dùng liên kết với đơn hàng (khóa ngoại kết nối đến bảng User_Accounts).
- **order_details**: Chi tiết đơn hàng (sản phẩm, số lượng, tổng giá trị, v.v.).
- **order_date**: Thời điểm đặt hàng.
- **order_status**: Trạng thái của đơn hàng (đã xác nhận, đang giao hàng, đã hoàn thành, v.v.).
- **created_at**: Thời điểm tạo đơn hàng.
- **updated_at**: Thời điểm cập nhật trạng thái đơn hàng.

Cấu trúc này cho phép lưu trữ thông tin của người dùng cũng như lịch sử đơn hàng nếu có. Bạn có thể điều chỉnh và mở rộng cấu trúc này tùy theo yêu cầu cụ thể của trang web quán cafe.
