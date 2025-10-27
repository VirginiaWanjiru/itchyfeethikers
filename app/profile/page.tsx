"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Bookmark,
  Bell,
  Mountain,
  CalendarDays,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { toast } from "sonner";
import { EmergencyContacts } from "@/components/EmergencyContacts";

// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";

// 🧩 Mock "database"
const mockProfileDB = {
  id: 1,
  name: "Natalie Ndetei",
  email: "natalie.ndetei@example.com",
  phone: "+254712345678",
  location: "Nairobi, Kenya",
  image: "https://source.unsplash.com/200x200/?portrait,woman", // 👈 Random Unsplash portrait
};

const Profile = () => {
  // const [isEditOpen, setIsEditOpen] = useState(false);
  // const [profileData, setProfileData] = useState({
  //   name: "Alex Morgan",
  //   email: "alex.morgan@email.com",
  //   phone: "+1 (555) 234-5678",
  //   location: "Portland, Oregon",
  // });

  const [trips, setTrips] = useState<any[]>([]);
  const [tripsLoading, setTripsLoading] = useState(true);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [profileData, setProfileData] = useState(mockProfileDB);

  const [previewImage, setPreviewImage] = useState(profileData.image);

  // Form states
  const [newTrip, setNewTrip] = useState({
    name: "",
    location: "",
    difficulty: "Easy",
    image: "",
  });

  // Temporary "mock database"
  const mockTrips = [
    {
      id: 1,
      name: "Mount Kenya Expedition",
      location: "Nanyuki, Kenya",
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Karura Forest Hike",
      location: "Nairobi, Kenya",
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Hell’s Gate Adventure",
      location: "Naivasha, Kenya",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1602416014133-bf3fa4b7a74b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // 🔔 Mock notifications
  const mockNotifications = [
    {
      id: 1,
      trip: "Mount Kenya Expedition",
      date: "Nov 2, 2025",
      destination: "Nanyuki, Kenya",
    },
    {
      id: 2,
      trip: "Hell’s Gate Adventure",
      date: "Dec 10, 2025",
      destination: "Naivasha, Kenya",
    },
    {
      id: 3,
      trip: "Karura Forest Hike",
      date: "Oct 22, 2025",
      destination: "Nairobi, Kenya",
    },
  ];

  // ⚙️ Simulate fetching both trips + notifications
  useEffect(() => {
    const fetchData = async () => {
      setTripsLoading(true);
      setNotificationsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500)); // fake delay

      setTrips(mockTrips);
      setNotifications(mockNotifications);

      setTripsLoading(false);
      setNotificationsLoading(false);
    };

    fetchData();
  }, []);

  // 🧠 Simulated save
  const handleSaveProfile = () => {
    Object.assign(mockProfileDB, profileData); // update mock "DB"
    setIsEditOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setProfileData({ ...profileData, image: imageUrl });
    }
  };

  // const { data: trips, isLoading: tripsLoading } = useQuery({
  //   queryKey: ["trips"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("trips")
  //       .select("*")
  //       .order("created_at", { ascending: false });
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  // const { data: notifications, isLoading: notificationsLoading } = useQuery({
  //   queryKey: ["notifications"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("notifications")
  //       .select("*")
  //       .order("created_at", { ascending: false });
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  // const handleSaveProfile = () => {
  //   toast( "Profile Updated", {
  //     description: "Your profile information has been saved successfully.",
  //   });
  //   setIsEditOpen(false);
  // };

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Profile Card */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <img
                  src={previewImage}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full object-cover border border-border shadow-md"
                />
                <div>
                  <CardTitle className="text-3xl pb-2 font-extrabold bg-gradient-to-r from-lime-800 via-olive-600 to-amber-700 bg-clip-text text-transparent drop-shadow-md tracking-tight">
                    {profileData.name}
                  </CardTitle>

                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </CardDescription>
                </div>
              </div>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="image">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Saved Trips */}
          <Card className="lg:col-span-2 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-emerald-100 bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-emerald-900 font-bold tracking-tight">
                    <Bookmark className="w-5 h-5 text-amber-700" />
                    Saved Trips
                  </CardTitle>
                  <CardDescription className="text-sm text-stone-600">
                    Trails calling your name 🌄
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  View All
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {tripsLoading ? (
                <div className="text-center py-8 text-muted-foreground animate-pulse">
                  Loading trips...
                </div>
              ) : trips && trips.length > 0 ? (
                trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/60 hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    {trip.image ? (
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-2 ring-emerald-100 group-hover:ring-amber-200 transition"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                        🏔️
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-900 group-hover:text-amber-800 transition">
                        {trip.name}
                      </h4>
                      <p className="text-sm text-stone-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {trip.location}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
              ${trip.difficulty === "Hard" ? "border-red-400 text-red-700" : ""}
              ${
                trip.difficulty === "Medium"
                  ? "border-amber-400 text-amber-700"
                  : ""
              }
              ${
                trip.difficulty === "Easy"
                  ? "border-emerald-400 text-emerald-700"
                  : ""
              }
              font-medium px-3 py-1
            `}
                    >
                      {trip.difficulty}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-500 italic">
                  No saved trips yet — time to plan your next adventure 🌍
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          {/* 🌍 Upcoming Trips Card */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border border-amber-200/30 bg-gradient-to-br from-stone-50 to-amber-50/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Bell className="w-5 h-5 text-amber-700 animate-pulse-slow" />
                Upcoming Trips
              </CardTitle>
              <CardDescription className="text-sm text-stone-600">
                Your next adventures await ✈️
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {notificationsLoading ? (
                <div className="text-center py-6 text-stone-500 italic">
                  Fetching your adventures...
                </div>
              ) : notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="group p-4 rounded-xl border border-amber-300/40 bg-white/70 hover:bg-amber-100/40 hover:shadow-md transition-all duration-300"
                  >
                    <p className="font-semibold text-amber-900 text-sm group-hover:translate-x-1 transition-transform">
                      {notif.trip}
                    </p>
                    <p className="text-xs text-stone-600 mt-1 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3 text-amber-700" />
                      {notif.date}
                    </p>
                    <p className="text-xs mt-1 flex items-center gap-1 text-stone-700">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      {notif.destination}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-500">
                  <Mountain className="w-8 h-8 mx-auto mb-2 text-amber-600/60" />
                  <p>No upcoming trips yet</p>
                  <p className="text-xs mt-1 text-stone-400">
                    Plan your next adventure soon 🌄
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <EmergencyContacts />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
