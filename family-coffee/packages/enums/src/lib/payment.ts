export const PAYMENT_STATUS = {
  UNPAID: 'Chưa thanh toán',
  PENDING: 'Đang chờ thanh toán',
  PAID: 'Đã thanh toán',
  CANCELLED: 'Đã hủy',
  REFUNDED: 'Đã hoàn trả',
  REJECTED: 'Đã từ chối',
  ERROR: 'Lỗi',
  PROCESSING: 'Đang xử lý',
  PENDING_CONFIRMATION: 'Chờ xác nhận',
  PENDING_PAYMENT_ROCESSING: 'Chờ xử lý thanh toán',
  FAILED: 'Thất bại',
  OTHER: 'Khác',
};

export type TypePaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_METHOD = {
  CASH: 'Tiền mặt',
  CREDIT_CARD: 'Thẻ tín dụng',
  BANK_TRANSFER: 'Chuyển khoản ngân hàng',
  EWALLET: 'Ví điện tử',
  PAYPAL: 'Paypal',
  ZALOPAY: 'ZaloPay',
  MOMO: 'Momo',
  APPLE_PAY: 'Apple Pay',
  GOOGLE_PAY: 'Google Pay',
  VOUCHER: 'Voucher',
  OTHER: 'Khác',
};

export type TypePamentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
