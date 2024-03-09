Dựa trên phân tích chức năng thanh toán tại quán, ta có thể mở rộng cấu trúc cơ sở dữ liệu như sau:

### Bảng "Payments" (Thanh toán):

- **payment_id**: Khóa chính, ID thanh toán (Unique).
- **order_id**: ID đơn hàng liên quan đến thanh toán (khóa ngoại kết nối đến bảng Orders).
- **payment_method**: Phương thức thanh toán (tiền mặt, thẻ, ví điện tử, v.v.).
- **amount**: Số tiền thanh toán.
- **payment_date**: Ngày và thời điểm thanh toán.
- **status**: Trạng thái thanh toán (đã thanh toán, đang xử lý, v.v.).
- **created_at**: Thời điểm tạo thanh toán.
- **updated_at**: Thời điểm cập nhật thanh toán.

### Bảng "Payment_History" (Lịch sử thanh toán):

- **history_id**: Khóa chính, ID lịch sử thanh toán (Unique).
- **payment_id**: ID thanh toán (khóa ngoại kết nối đến bảng Payments).
- **description**: Mô tả chi tiết về thanh toán (tuỳ chọn, ví dụ: hóa đơn số XYZ).
- **created_at**: Thời điểm tạo lịch sử thanh toán.
- **updated_at**: Thời điểm cập nhật lịch sử thanh toán.

Cấu trúc này cho phép lưu trữ thông tin về các thanh toán liên quan đến các đơn hàng cụ thể, bao gồm cả thông tin về phương thức thanh toán, số tiền, trạng thái thanh toán và lịch sử thanh toán. Thông qua việc liên kết với bảng Orders, bạn có thể theo dõi và quản lý các thanh toán theo đơn hàng tương ứng. Lưu ý rằng, cấu trúc cơ sở dữ liệu có thể được điều chỉnh để phù hợp với yêu cầu cụ thể của hệ thống thanh toán tại quán.