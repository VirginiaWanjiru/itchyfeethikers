export interface Booking {
  id: string;
  hikeId: string;
  userId: string;
  amount: number;
  paid: boolean;
  createdAt?: string;
  date?: string; // booking or hike date
}
