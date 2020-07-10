export interface OrderDocuments {
  id: number;
  documentType: string;
}

export interface OrderBuyer {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
}

export interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
  documents: OrderDocuments[];
  buyer: OrderBuyer | undefined;
}

export interface OrdersGetRequest {
  count: number;
  next: string;
  previous: string;
  results: Order[];
}
