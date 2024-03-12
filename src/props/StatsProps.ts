export interface StatsProps {
  orders: OrdersProps;
  sales: SalesProps;
  products: ProductsProps;
  categories: CategoryProps[];
}

export interface OrdersProps {
  totalOrders: number;
  pendingOrder: number;
  processingOrders: number;
  cancelledOrders: number;
  confirmedOrders: number;
  dispatchedOrders: number;
  deliveredOrders: number;
}

export interface SalesProps {
  totalSales: number;
  totalOrders: number;
}

export interface ProductsProps {
  totalProducts: number;
}

export interface CategoryProps {
  id: string;
  displayName: string;
  href: string;
  page: boolean;
  productCount: number;
}
