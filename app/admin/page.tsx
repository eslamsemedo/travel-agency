'use client'
import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { ImageIcon, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation';

// Hotel type (updated fields)
type HotelEntry = {
  _id: number;
  name: string;
  description: string;
  city: string;
  location: string;
  image: string;
  video: string;
};

// Sea Trip type (updated fields)
type SeaTripEntry = {
  _id: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  start_time: string;
  end_time: string;
  transportation: string;
  total_price: string;
  image: string;
  video: string;
};

// Safari Trip type (updated fields)
type SafariTripEntry = {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  start_time: string;
  end_time: string;
  transportation: string;
  video: string;
  total_price: string;
};

// Initial data
const initialHotelData: HotelEntry[] = [];
const initialSeaTripData: SeaTripEntry[] = [];
const initialSafariTripData: SafariTripEntry[] = [];

const emptyHotelForm: Omit<HotelEntry, '_id'> = {
  name: '',
  description: '',
  city: '',
  location: '',
  image: '',
  video: '',
};
const emptySeaTripForm: Omit<SeaTripEntry, '_id'> = {
  name: '',
  description: '',
  price: '',
  discount: '',
  start_time: '',
  end_time: '',
  transportation: '',
  total_price: '',
  image: '',
  video: '',
};
const emptySafariTripForm: Omit<SafariTripEntry, '_id'> = {
  name: '',
  description: '',
  price: '',
  image: '',
  start_time: '',
  end_time: '',
  transportation: '',
  video: '',
  total_price: '',
};

const AdminPanel = () => {
  const [panel, setPanel] = useState<'hotel' | 'seatrip' | 'safaritrip' | 'bookings'>('hotel');
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hotel state
  const [hotelData, setHotelData] = useState<HotelEntry[]>(initialHotelData);
  const [hotelForm, setHotelForm] = useState<typeof emptyHotelForm>(emptyHotelForm);
  const [hotelEditingId, setHotelEditingId] = useState<number | null>(null);
  const [hotelLoading, setHotelLoading] = useState(true);

  // Sea Trip state
  const [seaTripData, setSeaTripData] = useState<SeaTripEntry[]>(initialSeaTripData);
  const [seaTripForm, setSeaTripForm] = useState<typeof emptySeaTripForm>(emptySeaTripForm);
  const [seaTripEditingId, setSeaTripEditingId] = useState<string | null>(null);
  const [seaTripLoading, setSeaTripLoading] = useState(true);

  // Safari Trip state
  const [safariTripData, setSafariTripData] = useState<SafariTripEntry[]>(initialSafariTripData);
  const [safariTripForm, setSafariTripForm] = useState<typeof emptySafariTripForm>(emptySafariTripForm);
  const [safariTripEditingId, setSafariTripEditingId] = useState<string | null>(null);
  const [safariTripLoading, setSafariTripLoading] = useState(true);

  // Bookings state
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);
  const [statusEdits, setStatusEdits] = useState<{ [id: string]: string }>({});

  // Check authentication and fetch admin info
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await fetch('/api/auth/me', {
          credentials: 'include', // Important for cookies
        });
        console.log('Auth response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Auth successful, admin info:', data.admin);
          setAdminInfo(data.admin);
        } else {
          console.log('Auth failed, redirecting to login');
          router.push('/admin/login');
          return;
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Fetch hotel data from API
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setHotelLoading(true);


        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch("/api/hotels", requestOptions);

        if (response.ok) {
          const data = await response.json(); // Or `await response.text()` if response is not JSON
          setHotelData(data.data);
        } else {
          console.error("Failed to fetch hotel data");
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setHotelLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  // Fetch sea trip data from API
  useEffect(() => {
    const fetchSeaTripData = async () => {
      try {
        setSeaTripLoading(true);

        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch("/api/seaTrips", requestOptions);

        if (response.ok) {
          const data = await response.json();
          setSeaTripData(data.data);
        } else {
          console.error("Failed to fetch sea trip data");
        }
      } catch (error) {
        console.error("Error fetching sea trip data:", error);
      } finally {
        setSeaTripLoading(false);
      }
    };

    fetchSeaTripData();
  }, []);

  // Fetch safari trip data from API
  useEffect(() => {
    const fetchSafariTripData = async () => {
      try {
        setSafariTripLoading(true);

        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch("/api/safariTrips", requestOptions);

        if (response.ok) {
          const data = await response.json();
          setSafariTripData(data.data);
        } else {
          console.error("Failed to fetch safari trip data");
        }
      } catch (error) {
        console.error("Error fetching safari trip data:", error);
      } finally {
        setSafariTripLoading(false);
      }
    };

    fetchSafariTripData();
  }, []);

  // Fetch bookings data from API
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setBookingsLoading(true);

        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch("/api/bookings", requestOptions);

        if (response.ok) {
          const data = await response.json();
          setBookingsData(data.data);
        } else {
          console.error("Failed to fetch bookings data");
        }
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookingsData();
  }, []);

  // Hotel handlers
  const handleHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHotelForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append('name', hotelForm.name);
      // formData.append('description', hotelForm.description);
      // formData.append('city', hotelForm.city);
      // formData.append('location', hotelForm.location);
      // formData.append('image', "imgurl");
      // formData.append('video', "videourl");

      // if (hotelForm.image instanceof File) {
      //   formData.append('image', hotelForm.image);
      // }
      // if (hotelForm.video instanceof File) {
      //   formData.append('video', hotelForm.video);
      // }
      const bodyData = {
        name: hotelForm.name,
        description: hotelForm.description,
        city: hotelForm.city,
        location: hotelForm.location,
        image: hotelForm.image,
        video: hotelForm.video,
      }


      if (hotelEditingId) {
        // Update existing hotel
        console.log(hotelEditingId)
        const response = await fetch(`/api/hotels/${hotelEditingId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const updatedHotel = await response.json();
          setHotelData((prev) =>
            prev.map((item) =>
              item._id === hotelEditingId ? updatedHotel : item
            )
          );
          setHotelEditingId(null);
        } else {
          console.error('Failed to update hotel');
        }
      } else {
        // Create new hotel
        const response = await fetch('/api/hotels', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const newHotel = await response.json();
          setHotelData((prev) => [...prev, newHotel]);
        } else {
          console.error('Failed to create hotel', response.status);
        }
      }
      setHotelForm(emptyHotelForm);
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleHotelEdit = (id: number) => {
    const entry = hotelData.find((item) => item._id === id);
    console.log(id)
    if (entry) {
      const { _id: _id, ...rest } = entry;
      setHotelForm(rest);
      setHotelEditingId(id);
    }
  };

  const handleHotelDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/hotels/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHotelData((prev) => prev.filter((item) => item._id !== id));
        if (hotelEditingId === id) {
          setHotelEditingId(null);
          setHotelForm(emptyHotelForm);
        }
      } else {
        console.error('Failed to delete hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleHotelCancel = () => {
    setHotelEditingId(null);
    setHotelForm(emptyHotelForm);
  };

  // Sea Trip handlers
  const handleSeaTripChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeaTripForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeaTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bodyData = {
        name: seaTripForm.name,
        description: seaTripForm.description,
        price: seaTripForm.price,
        discount: seaTripForm.discount,
        start_time: seaTripForm.start_time,
        end_time: seaTripForm.end_time,
        transportation: seaTripForm.transportation,
        total_price: String((parseFloat(seaTripForm.transportation) + parseFloat(seaTripForm.price)) * (1-parseFloat(seaTripForm.discount)/100) + String(seaTripForm.price.split(" ")[1])),
        image: seaTripForm.image,
        video: seaTripForm.video,
      }

      if (seaTripEditingId) {
        // Update existing sea trip
        const response = await fetch(`/api/seaTrips/${seaTripEditingId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const updatedSeaTrip = await response.json();
          setSeaTripData((prev) =>
            prev.map((item) =>
              item._id === seaTripEditingId ? updatedSeaTrip.data : item
            )
          );
          setSeaTripEditingId(null);
        } else {
          console.error('Failed to update sea trip');
        }
      } else {
        // Create new sea trip
        const response = await fetch('/api/seaTrips', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const newSeaTrip = await response.json();
          setSeaTripData((prev) => [...prev, newSeaTrip.data]);
        } else {
          console.error('Failed to create sea trip', response.status);
        }
      }
      setSeaTripForm(emptySeaTripForm);
    } catch (error) {
      console.error('Error saving sea trip:', error);
    }
  };

  const handleSeaTripEdit = (id: string) => {
    const entry = seaTripData.find((item) => item._id === id);
    if (entry) {
      const { _id: _id, ...rest } = entry;
      setSeaTripForm(rest);
      setSeaTripEditingId(id);
    }
  };

  const handleSeaTripDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/seaTrips/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSeaTripData((prev) => prev.filter((item) => item._id !== id));
        if (seaTripEditingId === id) {
          setSeaTripEditingId(null);
          setSeaTripForm(emptySeaTripForm);
        }
      } else {
        console.error('Failed to delete sea trip');
      }
    } catch (error) {
      console.error('Error deleting sea trip:', error);
    }
  };

  const handleSeaTripCancel = () => {
    setSeaTripEditingId(null);
    setSeaTripForm(emptySeaTripForm);
  };

  // Safari Trip handlers
  const handleSafariTripChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSafariTripForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSafariTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bodyData = {
        name: safariTripForm.name,
        description: safariTripForm.description,
        price: safariTripForm.price,
        start_time: safariTripForm.start_time,
        end_time: safariTripForm.end_time,
        transportation: safariTripForm.transportation,
        total_price: String((parseFloat(safariTripForm.transportation) + parseFloat(safariTripForm.price)) + String(safariTripForm.price.split(" ")[1])),
        image: safariTripForm.image,
        video: safariTripForm.video,
      }

      if (safariTripEditingId) {
        // Update existing safari trip
        const response = await fetch(`/api/safariTrips/${safariTripEditingId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const updatedSafariTrip = await response.json();
          setSafariTripData((prev) =>
            prev.map((item) =>
              item._id === safariTripEditingId ? updatedSafariTrip.data : item
            )
          );
          setSafariTripEditingId(null);
        } else {
          console.error('Failed to update safari trip');
        }
      } else {
        // Create new safari trip
        const response = await fetch('/api/safariTrips', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const newSafariTrip = await response.json();
          setSafariTripData((prev) => [...prev, newSafariTrip.data]);
        } else {
          console.error('Failed to create safari trip');
        }
      }
      setSafariTripForm(emptySafariTripForm);
    } catch (error) {
      console.error('Error saving safari trip:', error);
    }
  };

  const handleSafariTripEdit = (id: string) => {
    const entry = safariTripData.find((item) => item._id === id);
    if (entry) {
      const { _id: _id, ...rest } = entry;
      setSafariTripForm(rest);
      setSafariTripEditingId(id);
    }
  };

  const handleSafariTripDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/safariTrips/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSafariTripData((prev) => prev.filter((item) => item._id !== id));
        if (safariTripEditingId === id) {
          setSafariTripEditingId(null);
          setSafariTripForm(emptySafariTripForm);
        }
      } else {
        console.error('Failed to delete safari trip');
      }
    } catch (error) {
      console.error('Error deleting safari trip:', error);
    }
  };

  const handleSafariTripCancel = () => {
    setSafariTripEditingId(null);
    setSafariTripForm(emptySafariTripForm);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Bookings status update handler
  const handleStatusChange = (id: string, newStatus: string) => {
    setStatusEdits((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleStatusUpdate = async (id: string) => {
    setStatusUpdateLoading(id);
    setStatusUpdateError(null);
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusEdits[id] }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh bookings data
        setBookingsData((prev) => prev.map((b) => b._id === id ? { ...b, status: statusEdits[id] } : b));
      } else {
        setStatusUpdateError(data.message || 'Failed to update status');
      }
    } catch (error) {
      setStatusUpdateError('Network error');
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with admin info and logout */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">
              Welcome, {adminInfo?.username} ({adminInfo?.role})
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded font-semibold transition ${panel === 'hotel' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setPanel('hotel')}
        >
          Hotel Panel
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition ${panel === 'seatrip' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setPanel('seatrip')}
        >
          Sea Trips Panel
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition ${panel === 'safaritrip' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setPanel('safaritrip')}
        >
          Safari Trips Panel
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition ${panel === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setPanel('bookings')}
        >
          Bookings Panel
        </button>
      </div>
      {panel === 'hotel' ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">Hotel Admin Panel</h1>
          <form
            onSubmit={handleHotelSubmit}
            className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
          >
            <input
              name="name"
              placeholder="Name"
              value={hotelForm.name}
              onChange={handleHotelChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="city"
              placeholder="City"
              value={hotelForm.city}
              onChange={handleHotelChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={hotelForm.description}
              onChange={handleHotelChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
            />
            <input
              name="location"
              placeholder="Location Link (Google Maps URL)"
              value={hotelForm.location}
              onChange={handleHotelChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
              <CldUploadWidget
                uploadPreset="moshNext"
                options={{
                  maxFileSize: 2000000, // 2MB
                  sources: ["local", "camera"],
                  styles: {
                    palette: {
                      window: "#07253E",
                      windowBorder: "#90A0B3",
                      tabIcon: "#0078FF",
                      menuIcons: "#5A616A",
                      textDark: "#000000",
                      textLight: "#FFFFFF",
                      link: "#0078FF",
                      action: "#FF620C",
                      inactiveTabIcon: "#245DA7",
                      error: "#F44235",
                      inProgress: "#0078FF",
                      complete: "#20B832",
                      sourceBg: "#000000"
                    },
                    fonts: {
                      default: {
                        active: true
                      }
                    }
                  }
                }}
                onSuccess={(result) => {
                  const url =
                    typeof result.info === "object" && result.info && "url" in result.info
                      ? (result.info.url as string)
                      : ""
                  setHotelForm(prev => ({ ...prev, image: url }))
                }}
              >
                {({ open }) => {
                  return (
                    <div className='flex items-center gap-2'>
                      <Button
                        type="button"
                        onClick={() => open()}

                        variant="outline"
                        className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                      >
                        <ImageIcon className="mr-2" size={16} color="currentColor" />
                        add image
                      </Button>
                      <div className="text-sm text-black">
                        {hotelForm.image || 'No image'}
                      </div>
                    </div>
                  )
                }}
              </CldUploadWidget>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                name="video"
                type="url"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                value={hotelForm.video}
                onChange={handleHotelChange}
                required
                className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-2 mt-2 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {hotelEditingId ? 'Update' : 'Add'} Entry
              </button>
              {hotelEditingId && (
                <button
                  type="button"
                  onClick={handleHotelCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="overflow-x-auto">
            {hotelLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Loading hotels...</div>
              </div>
            ) : (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">City</th>
                    <th className="py-2 px-3">Location</th>
                    <th className="py-2 px-3">Image</th>
                    <th className="py-2 px-3">Video</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-500">
                        No hotels found
                      </td>
                    </tr>
                  ) : (
                    hotelData.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.name}</td>
                        <td className="py-2 px-3 max-w-xs truncate text-center" title={item.description}>{item.description}</td>
                        <td className="py-2 px-3 text-center">{item.city}</td>
                        <td className="py-2 px-3 text-center">
                          <a
                            href={item.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Location
                          </a>
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-10 object-cover rounded shadow mx-auto"
                            />
                          ) : (
                            <div className="text-sm text-gray-500">No image</div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.video ? (
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Video
                            </a>
                          ) : (
                            <div className="text-sm text-gray-500">No video</div>
                          )}
                        </td>
                        <td className="py-2 px-3 flex gap-2 justify-center">
                          <button
                            onClick={() => handleHotelEdit(item._id)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleHotelDelete(item._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : panel === 'seatrip' ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">Sea Trips Admin Panel</h1>
          <form
            onSubmit={handleSeaTripSubmit}
            className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
          >
            <input
              name="name"
              placeholder="Name"
              value={seaTripForm.name}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="price"
              placeholder="Price"
              value={seaTripForm.price}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={seaTripForm.description}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
            />
            <input
              name="start_time"
              placeholder="Start Time (e.g., 9:00 AM, 14:30)"
              value={seaTripForm.start_time}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="end_time"
              placeholder="End Time (e.g., 5:00 PM, 18:30)"
              value={seaTripForm.end_time}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
              {/* <input
                name="image"
                type="file"
                accept="image/*"
                
                required
                className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              /> */}
              <CldUploadWidget
                uploadPreset="moshNext"
                options={{
                  // multiple: false,
                  maxFileSize: 2000000, // 2MB
                  // cropping: true,
                  sources: ["local", "camera"],
                  styles: {
                    palette: {
                      window: "#07253E",
                      windowBorder: "#90A0B3",
                      tabIcon: "#0078FF",
                      menuIcons: "#5A616A",
                      textDark: "#000000",
                      textLight: "#FFFFFF",
                      link: "#0078FF",
                      action: "#FF620C",
                      inactiveTabIcon: "#245DA7",
                      error: "#F44235",
                      inProgress: "#0078FF",
                      complete: "#20B832",
                      sourceBg: "#000000"
                    },
                    fonts: {
                      default: {
                        active: true
                      }
                    }
                  }
                }}
                onSuccess={(result) => {
                  const url =
                    typeof result.info === "object" && result.info && "url" in result.info
                      ? (result.info.url as string)
                      : ""
                  setSeaTripForm(prev => ({ ...prev, image: url }))
                }}
              >
                {({ open }) => {
                  return (
                    <div className='flex items-center gap-2'>
                      <Button
                        type="button"
                        onClick={() => open()}

                        variant="outline"
                        className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                      >
                        <ImageIcon className="mr-2" size={16} color="currentColor" />
                        add image
                      </Button>
                      <div className="text-sm text-black">
                        {seaTripForm.image || 'No image'}
                      </div>
                    </div>
                  )
                }}
              </CldUploadWidget>

            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                name="video"
                type="url"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                value={seaTripForm.video}
                onChange={handleSeaTripChange}
                required
                className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <input
              name="discount"
              placeholder="Discount"
              value={seaTripForm.discount}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="transportation"
              placeholder="Transportation"
              value={seaTripForm.transportation}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* <input
              name="total_price"
              placeholder="Total Price"
              value={seaTripForm.total_price}
              onChange={handleSeaTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            /> */}
            <div className="flex items-center gap-2 mt-2 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {seaTripEditingId ? 'Update' : 'Add'} Trip
              </button>
              {seaTripEditingId && (
                <button
                  type="button"
                  onClick={handleSeaTripCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="overflow-x-auto">
            {seaTripLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Loading sea trips...</div>
              </div>
            ) : (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">Price</th>
                    <th className="py-2 px-3">Discount</th>
                    <th className="py-2 px-3">Start Time</th>
                    <th className="py-2 px-3">End Time</th>
                    <th className="py-2 px-3">Transportation</th>
                    <th className="py-2 px-3">Total Price</th>
                    <th className="py-2 px-3">Image</th>
                    <th className="py-2 px-3">Video</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seaTripData.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-4 text-center text-gray-500">
                        No sea trips found
                      </td>
                    </tr>
                  ) : (
                    seaTripData.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.name}</td>
                        <td className="py-2 px-3 max-w-xs truncate text-center" title={item.description}>{item.description}</td>
                        <td className="py-2 px-3 text-center">{item.price}</td>
                        <td className="py-2 px-3 text-center">{item.discount}</td>
                        <td className="py-2 px-3 text-center">{item.start_time}</td>
                        <td className="py-2 px-3 text-center">{item.end_time}</td>
                        <td className="py-2 px-3 text-center">{item.transportation}</td>
                        <td className="py-2 px-3 text-center">{item.total_price}</td>
                        <td className="py-2 px-3 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-10 object-cover rounded shadow mx-auto"
                            />
                          ) : (
                            <div className="text-sm text-gray-500">No image</div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.video ? (
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Video
                            </a>
                          ) : (
                            <div className="text-sm text-gray-500">No video</div>
                          )}
                        </td>
                        <td className="py-2 px-3 flex gap-2 justify-center">
                          <button
                            onClick={() => handleSeaTripEdit(item._id)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSeaTripDelete(item._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : panel === 'safaritrip' ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">Safari Trips Admin Panel</h1>
          <form
            onSubmit={handleSafariTripSubmit}
            className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
          >
            <input
              name="name"
              placeholder="Name"
              value={safariTripForm.name}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="price"
              placeholder="Price"
              value={safariTripForm.price}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={safariTripForm.description}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
            />

            <input
              name="start_time"
              placeholder="Start Time (e.g., 9:00 AM, 14:30)"
              value={safariTripForm.start_time}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="end_time"
              placeholder="End Time (e.g., 5:00 PM, 18:30)"
              value={safariTripForm.end_time}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="transportation"
              placeholder="Transportation"
              value={safariTripForm.transportation}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
              <CldUploadWidget
                uploadPreset="moshNext"
                options={{
                  maxFileSize: 2000000, // 2MB
                  sources: ["local", "camera"],
                  styles: {
                    palette: {
                      window: "#07253E",
                      windowBorder: "#90A0B3",
                      tabIcon: "#0078FF",
                      menuIcons: "#5A616A",
                      textDark: "#000000",
                      textLight: "#FFFFFF",
                      link: "#0078FF",
                      action: "#FF620C",
                      inactiveTabIcon: "#245DA7",
                      error: "#F44235",
                      inProgress: "#0078FF",
                      complete: "#20B832",
                      sourceBg: "#000000"
                    },
                    fonts: {
                      default: {
                        active: true
                      }
                    }
                  }
                }}
                onSuccess={(result) => {
                  const url =
                    typeof result.info === "object" && result.info && "url" in result.info
                      ? (result.info.url as string)
                      : ""
                  setSafariTripForm(prev => ({ ...prev, image: url }))
                }}
              >
                {({ open }) => {
                  return (
                    <div className='flex items-center gap-2'>
                      <Button
                        type="button"
                        onClick={() => open()}

                        variant="outline"
                        className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                      >
                        <ImageIcon className="mr-2" size={16} color="currentColor" />
                        add image
                      </Button>
                      <div className="text-sm text-black">
                        {safariTripForm.image || 'No image'}
                      </div>
                    </div>
                  )
                }}
              </CldUploadWidget>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                name="video"
                type="url"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                value={safariTripForm.video}
                onChange={handleSafariTripChange}
                required
                className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* <input
              name="total_price"
              placeholder="Total Price"
              value={safariTripForm.total_price}
              onChange={handleSafariTripChange}
              required
              className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            /> */}
            <div className="flex items-center gap-2 mt-2 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {safariTripEditingId ? 'Update' : 'Add'} Trip
              </button>
              {safariTripEditingId && (
                <button
                  type="button"
                  onClick={handleSafariTripCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="overflow-x-auto">
            {safariTripLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Loading safari trips...</div>
              </div>
            ) : (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">Price</th>
                    <th className="py-2 px-3">Image</th>
                    <th className="py-2 px-3">Start Time</th>
                    <th className="py-2 px-3">End Time</th>
                    <th className="py-2 px-3">Transportation</th>
                    <th className="py-2 px-3">Video</th>
                    <th className="py-2 px-3">Total Price</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {safariTripData.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-4 text-center text-gray-500">
                        No safari trips found
                      </td>
                    </tr>
                  ) : (
                    safariTripData.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50 ">
                        <td className="py-2 px-3 text-center">{item.name}</td>
                        <td className="py-2 px-3 max-w-xs truncate text-center" title={item.description}>{item.description}</td>
                        <td className="py-2 px-3 text-center">{item.price}</td>
                        <td className="py-2 px-3 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-10 object-cover rounded shadow mx-auto"
                            />
                          ) : (
                            <div className="text-sm text-gray-500">No image</div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">{item.start_time}</td>
                        <td className="py-2 px-3 text-center">{item.end_time}</td>
                        <td className="py-2 px-3 text-center">{item.transportation}</td>
                        <td className="py-2 px-3 text-center">
                          {item.video ? (
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Video
                            </a>
                          ) : (
                            <div className="text-sm text-gray-500">No video</div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">{item.total_price}</td>
                        <td className="py-2 px-3 flex gap-2 justify-center">
                          <button
                            onClick={() => handleSafariTripEdit(item._id)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSafariTripDelete(item._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : panel === 'bookings' ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">Bookings Panel</h1>
          <div className="overflow-x-auto">
            {bookingsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Loading bookings...</div>
              </div>
            ) : (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Nationality</th>
                    <th className="py-2 px-3">Phone Number</th>
                    <th className="py-2 px-3">Trip Name</th>
                    <th className="py-2 px-3">Trip Type</th>
                    <th className="py-2 px-3">Trip Price</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-4 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookingsData.map((booking) => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{booking.name}</td>
                        <td className="py-2 px-3 text-center">{booking.nationality}</td>
                        <td className="py-2 px-3 text-center">{booking.phoneNumber}</td>
                        <td className="py-2 px-3 text-center">{booking.tripName}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            booking.tripType === 'hotel' ? 'bg-blue-100 text-blue-800' :
                            booking.tripType === 'seaTrip' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {booking.tripType === 'hotel' ? 'Hotel' : 
                             booking.tripType === 'seaTrip' ? 'Sea Trip' : 'Safari Trip'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">{booking.tripPrice}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                          <div className="mt-2 flex items-center gap-2 justify-center">
                            <select
                              value={statusEdits[booking._id] ?? booking.status}
                              onChange={e => handleStatusChange(booking._id, e.target.value)}
                              className="border rounded px-2 py-1 text-xs"
                              disabled={statusUpdateLoading === booking._id}
                            >
                              <option value="pending">pending</option>
                              <option value="confirmed">confirmed</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(booking._id)}
                              disabled={statusUpdateLoading === booking._id || (statusEdits[booking._id] ?? booking.status) === booking.status}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                            >
                              {statusUpdateLoading === booking._id ? 'Saving...' : 'Save'}
                            </button>
                          </div>
                          {statusUpdateError && statusUpdateLoading === null && (
                            <div className="text-xs text-red-500 mt-1">{statusUpdateError}</div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AdminPanel;
