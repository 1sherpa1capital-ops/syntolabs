"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BookingEvent {
  uid: string;
  email?: string;
  start?: string;
  status: string;
  type: "created" | "cancelled";
  createdAt: string;
}

interface BookingContextType {
  events: BookingEvent[];
  refresh: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<BookingEvent[]>([]);

  const refresh = async () => {
    try {
      const response = await fetch("/api/calcom/webhook");
      if (response.ok) {
        const data = await response.json();
        setEvents(data.bookings || []);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  // Poll for bookings every 10 seconds
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BookingContext.Provider value={{ events, refresh }}>
      {children}
    </BookingContext.Provider>
  );
}
