import React from "react";
import OrdersPage from "./OrdersPage";

export const PurchasesPage: React.FC = () => <OrdersPage type="purchases" />;
export const SalesPage: React.FC = () => <OrdersPage type="sales" />;
