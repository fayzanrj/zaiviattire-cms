import { ProductProps, ProductVariantProps } from "./ProductProps";

export interface OrderProps {
  id: string;
  orderId: string;
  status: orderStatusProps;
  shippingInfo: {
    address: string;
    city: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    zip: string;
  };
  orderItems: OrderItemProps[];
  total: number;
  cancelReason?: string;
  trackingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItemProps {
  id: string;
  orderDBId: string;
  productDBId: string;
  productId: string;
  orderNumber: string;
  discount: number;
  total: number;
  variant: ProductVariantProps;
  Product: ProductProps;
}

export type orderStatusProps =
  | "Processing"
  | "Pending"
  | "Confirmed"
  | "Dispatched"
  | "Cancelled"
  | "Delivered";
