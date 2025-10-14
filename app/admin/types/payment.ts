export interface Payment {
  id: string;
  bookingId: string;
  method: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed' | 'refunded';
  createdAt?: string;
}
