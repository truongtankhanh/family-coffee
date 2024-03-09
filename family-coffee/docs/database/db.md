### Bảng "Categories" (Danh mục sản phẩm):

- **id**: Khóa chính, ID danh mục sản phẩm (Unique).
- **name**: Tên danh mục.
- **parent_id**: ID danh mục cha (để hỗ trợ danh mục con, khóa ngoại tham chiếu đến chính bảng Categories).
- **created_at**: Thời điểm tạo danh mục sản phẩm.
- **updated_at**: Thời điểm cập nhật danh mục sản phẩm.

### Bảng "Products" (Sản phẩm):

- **id**: Khóa chính, ID sản phẩm (Unique).
- **name**: Tên sản phẩm.
- **description**: Mô tả sản phẩm.
- **price**: Giá sản phẩm.
- **primary_image_url**: Đường dẫn đến hình ảnh đại diện của sản phẩm.
- **image_urls**: Danh sách đường dẫn đến hình ảnh của sản phẩm (có thể là một mảng, JSON, hoặc chuỗi chứa các đường dẫn).
- **created_at**: Thời điểm tạo sản phẩm.
- **updated_at**: Thời điểm cập nhật sản phẩm.

### Bảng "Product_Category" (Liên kết sản phẩm và danh mục):

- **id**: Khóa chính, ID liên kết sản phẩm và danh mục (Unique).
- **product_id**: ID sản phẩm (khóa ngoại kết nối đến bảng Products).
- **category_id**: ID danh mục sản phẩm (khóa ngoại kết nối đến bảng Categories).
- **created_at**: Thời điểm tạo liên kết sản phẩm và danh mục.
- **updated_at**: Thời điểm cập nhật liên kết sản phẩm và danh mục.

### Bảng "Promotions" (Khuyến mãi):

- **id**: Khóa chính, ID chương trình khuyến mãi (Unique).
- **name**: Tên chương trình khuyến mãi.
- **start_date**: Ngày bắt đầu chương trình khuyến mãi.
- **end_date**: Ngày kết thúc chương trình khuyến mãi.
- **discount_amount**: Số tiền giảm giá cho chương trình khuyến mãi.
- **created_at**: Ngày tạo chương trình khuyến mãi.
- **updated_at**: Ngày cập nhật chương trình khuyến mãi.

### Bảng "Product_Promotions" (Sản phẩm - Khuyến mãi):

- **product_id**: Khóa ngoại kết nối đến bảng "Products".
- **promotion_id**: Khóa ngoại kết nối đến bảng "Promotions".
- **created_at**: Ngày tạo liên kết sản phẩm - chương trình khuyến mãi.
- **updated_at**: Ngày cập nhật liên kết sản phẩm - chương trình khuyến mãi.

### Bảng "Customers" (Khách hàng):

- **id**: Khóa chính, ID khách hàng (Unique).
- **name**: Tên khách hàng.
- **email**: Email khách hàng.
- **phone_number**: Số điện thoại khách hàng.
- **address**: Địa chỉ khách hàng.
- **created_at**: Thời điểm tạo thông tin khách hàng.
- **updated_at**: Thời điểm cập nhật thông tin khách hàng.

### Bảng "Orders" (Đơn hàng):

- **id**: Khóa chính, ID đơn hàng (Unique).
- **type**: Loại đơn hàng (online, offline).
- **customer_id**: ID của khách hàng (nếu có).
- **order_date**: Ngày đặt hàng.
- **status**: Trạng thái đơn hàng (đang xử lý, đã xác nhận, đã thanh toán, v.v.).
- **payment_status**: Trạng thái thanh toán (nếu áp dụng).
- **total_amount**: Tổng số tiền của đơn hàng.
- **created_at**: Thời điểm tạo đơn hàng.
- **updated_at**: Thời điểm cập nhật đơn hàng.

### Bảng "Order_Items" (Chi tiết đơn hàng):

- **id**: Khóa chính, ID chi tiết của mỗi sản phẩm trong đơn hàng (Unique).
- **order_id**: ID đơn hàng (Khóa ngoại kết nối với bảng Orders).
- **product_id**: ID sản phẩm.
- **quantity**: Số lượng sản phẩm.
- **unit_price**: Giá sản phẩm (mỗi đơn vị).
- **subtotal**: Tổng giá của sản phẩm trong đơn hàng.
- **created_at**: Thời điểm tạo chi tiết đơn hàng.
- **updated_at**: Thời điểm cập nhật chi tiết đơn hàng.

### Bảng "Payments" (Thanh toán):

- **id**: Khóa chính, ID thanh toán (Unique).
- **order_id**: ID đơn hàng liên quan đến thanh toán (khóa ngoại kết nối đến bảng Orders).
- **payment_method**: Phương thức thanh toán (tiền mặt, thẻ, ví điện tử, v.v.).
- **amount**: Số tiền thanh toán.
- **payment_date**: Ngày và thời điểm thanh toán.
- **status**: Trạng thái thanh toán (đã thanh toán, đang xử lý, v.v.).
- **created_at**: Thời điểm tạo thanh toán.
- **updated_at**: Thời điểm cập nhật thanh toán.

### Bảng "Payment_History" (Lịch sử thanh toán):

- **id**: Khóa chính, ID lịch sử thanh toán (Unique).
- **payment_id**: ID thanh toán (khóa ngoại kết nối đến bảng Payments).
- **description**: Mô tả chi tiết về thanh toán (tuỳ chọn, ví dụ: hóa đơn số XYZ).
- **created_at**: Thời điểm tạo lịch sử thanh toán.
- **updated_at**: Thời điểm cập nhật lịch sử thanh toán.

### Bảng "User_Accounts" (Tài khoản người dùng):

- **id**: Khóa chính, ID của người dùng (Unique).
- **name**: Tên đăng nhập của người dùng.
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

### Bảng "Restaurant" (Thông tin quán):

- **id**: Khóa chính, ID thông tin quán (Unique).
- **description**: Mô tả về quán.
- **address**: Địa chỉ quán.
- **phone_number**: Số điện thoại quán.
- **email**: Địa chỉ email liên hệ.
- **working_hours**: Giờ mở cửa và đóng cửa của quán.
- **created_at**: Thời điểm tạo thông tin quán.
- **updated_at**: Thời điểm cập nhật thông tin quán.

## Bảng "Blog_Posts" (Bài viết Blog):

- **id**: Khóa chính, ID bài viết (Unique).
- **title**: Tiêu đề bài viết.
- **content**: Nội dung bài viết.
- **author**: Tác giả bài viết.
- **category**: Danh mục của bài viết (sự kiện, sản phẩm mới, tin tức, v.v.).
- **published_at**: Thời điểm đăng bài viết.
- **created_at**: Thời điểm tạo bài viết.
- **updated_at**: Thời điểm cập nhật bài viết.

### Bảng "Comments" (Bình luận):

- **id**: Khóa chính, ID bình luận (Unique).
- **post_id**: ID bài viết liên kết đến bình luận (khóa ngoại kết nối đến bảng Blog_Posts).
- **commenter_name**: Tên người bình luận.
- **comment_content**: Nội dung bình luận.
- **commented_at**: Thời điểm bình luận.
- **created_at**: Thời điểm tạo bình luận.
- **updated_at**: Thời điểm cập nhật bình luận.
