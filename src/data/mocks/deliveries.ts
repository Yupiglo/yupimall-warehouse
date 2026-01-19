import { Delivery } from "@/types";

export const mockDeliveries: Delivery[] = [
  {
    id: "#9821",
    location: "Downtown",
    customer: "Alice Freeman",
    courier: "James Wilson",
    status: "Delivered",
    statusColor: "success",
    time: "10m ago",
  },
  {
    id: "#9820",
    location: "Uptown",
    customer: "Bob Smith",
    courier: "Sarah Connor",
    status: "In Transit",
    statusColor: "info",
    time: "25m ago",
  },
  {
    id: "#9819",
    location: "Main Street",
    customer: "Charlie Brown",
    courier: "Michael Scott",
    status: "Picked Up",
    statusColor: "warning",
    time: "40m ago",
  },
  {
    id: "#9818",
    location: "Suburb",
    customer: "David Wilson",
    courier: "James Wilson",
    status: "Delivered",
    statusColor: "success",
    time: "1h ago",
  },
  {
    id: "#9817",
    location: "Commercial Area",
    customer: "Eva Green",
    courier: "Sarah Connor",
    status: "Cancelled",
    statusColor: "error",
    time: "2h ago",
  },
];
