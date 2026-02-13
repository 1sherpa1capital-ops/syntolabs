"use client";

import { useEffect } from "react";
import { useBooking } from "@/context/booking-context";

export function BookingToasts() {
  const { events } = useBooking();

  useEffect(() => {
    for (const event of events) {
      if (event.type === "created") {
        console.log("Booking created:", event);
      } else if (event.type === "cancelled") {
        console.log("Booking cancelled:", event);
      }
    }
  }, [events]);

  return null;
}
