import { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    description: "Order #ORD-9922 has been placed.",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Delivery Completed",
    description: "Package delivered to Alice Johnson.",
    time: "45 mins ago",
    unread: true,
  },
  {
    id: 3,
    title: "Low Stock Alert",
    description: "Wireless Headphones are below threshold.",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 4,
    title: "New Manager Added",
    description: "Steve Rogers was added to the team.",
    time: "5 hours ago",
    unread: false,
  },
];
