"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CalendarIcon, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// mock data
interface Booking {
  id: number;
  trip_name: string;
  date: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  amount: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    trip_name: "Mount Kenya Adventure",
    date: "2025-11-10",
    status: "Confirmed",
    amount: "$120",
  },
  {
    id: 2,
    trip_name: "Amboseli Safari",
    date: "2025-11-14",
    status: "Pending",
    amount: "$85",
  },
  {
    id: 3,
    trip_name: "Hell’s Gate Hike",
    date: "2025-11-21",
    status: "Cancelled",
    amount: "$60",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-primary/10 text-primary border-primary/20";
    case "Pending":
      return "bg-accent text-accent-foreground border-accent/40";
    case "Cancelled":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "";
  }
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // simulate async fetch
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookings(mockBookings);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your trip bookings
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-md">
          <CardContent className="pt-6 overflow-visible">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search bookings..." className="pl-10" />
              </div>

              {/* Status filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Date filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-2 z-50 bg-background border rounded-md shadow-lg"
                  align="start"
                  sideOffset={5}
                >
                  <DatePicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>
              A complete history of your hiking adventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto overflow-y-visible">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Trip Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Loading bookings...
                      </td>
                    </tr>
                  ) : bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-border hover:bg-secondary/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-foreground">
                            {booking.trip_name}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className={getStatusColor(booking.status)}
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 font-semibold text-foreground">
                          {booking.amount}
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
