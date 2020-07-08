export interface OrderDocuments {
  id: number;
  documentType: string;
}

export interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
  documents: OrderDocuments[];
}

export interface OrdersGetRequest {
  count: number;
  next: string;
  previous: string;
  results: Order[];
}
