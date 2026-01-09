"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner"; // Assuming sonner is available based on previous context, otherwise use alert

interface OrderItem {
    productId: number;
    title: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    totalAmount: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            // toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            // Optimistic update
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            // toast.success("Order status updated");
        } catch (error) {
            console.error("Failed to update status:", error);
            // Revert on failure
            fetchOrders();
            // toast.error("Failed to update status");
            alert("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">#{order.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.customerName}</span>
                                            <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            {order.items.map((item, idx) => (
                                                <span key={idx} className="text-muted-foreground">
                                                    {item.quantity}x {item.title}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatPrice(parseFloat(order.totalAmount))}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={order.status}
                                            onValueChange={(value) => handleStatusChange(order.id, value)}
                                        >
                                            <SelectTrigger className="w-[130px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white text-black">
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="paid">Paid</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
