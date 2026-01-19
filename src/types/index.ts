export interface Order {
  id: string;
  customer: string;
  status: "Pending" | "Completed" | "In Progress" | "Cancelled";
  amount: string;
  date: string;
}

export interface Product {
  id: number | string;
  name: string;
  sku: string;
  label: string;
  price: number;
  quantity: number;
  color: string;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export interface Delivery {
  id: string;
  location: string;
  customer: string;
  courier: string;
  status: "Delivered" | "In Transit" | "Picked Up" | "Cancelled";
  statusColor: "success" | "info" | "warning" | "error" | "default";
  time: string;
}

export interface Customer {
  id: number | string;
  title: string;
  subtitle: string;
  value: string;
  image: string;
}

export interface Entry {
  id: string;
  product: string;
  sku: string;
  quantity: number;
  supplier: string;
  date: string;
}

export interface Exit {
  id: string;
  product: string;
  sku: string;
  quantity: number;
  destination: string;
  date: string;
}
export interface WidgetItem {
  id: number | string;
  title: string;
  subtitle: string;
  value: string;
  image?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: "success" | "warning" | "error" | "info" | "default";
}

export type StockistPackage =
  | "Yupi"
  | "Elite"
  | "Succes"
  | "Prestige"
  | "Visionnaire"
  | "Triomphe"
  | "Prosperity";
