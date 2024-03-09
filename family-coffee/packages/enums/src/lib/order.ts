export const ORDER_STATUS = {
  CONFIRMED: 'Đã xác nhận',
  OUT_FOR_DELIVERY: 'Đang giao hàng',
  DELIVERED: 'Đã giao hàng',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã hủy',
  PENDING_CONFIRMATION: 'Đang chờ xác nhận',
  PENDING_PROCESSING: 'Đang chờ xử lý',
  PENDING_SHIPMENT: 'Đang chờ vận chuyển',
  PENDING_PAYMENT: 'Đang chờ thanh toán',
  REFUNDED: 'Đã trả lại',
  PROCESSING: 'Đang xử lý',
  AWAITING_PAYMENT_CONFIRMATION: 'Chờ xác nhận thanh toán',
  REATTEMPTING_DELIVERY: 'Đang giao lại',
  RETURNED: 'Hoàn lại',
  REJECTED: 'Đã từ chối',
  OTHER: 'Khác',
};

export type TypeOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
