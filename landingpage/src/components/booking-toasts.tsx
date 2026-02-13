"use client";

import { useBooking } from "@/context/booking-context";
import { useEffect } from "react";
import { X } from "lucide-react";

interface BookingToastProps {
  className?: string;
}

export function BookingToasts({ className }: BookingToastProps) {
  const { events } = useBooking();
  const [visible, setVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<typeof events[0] | null>(null);

  // Show toast when new booking event is added
  useEffect(() => {
    if (events.length > 0 && !currentEvent) {
      setCurrentEvent(events[0]);
      setVisible(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setCurrentEvent(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [events, currentEvent]);

  if (!visible || !currentEvent) return null;

  const isSuccess = currentEvent.type === "created";
  const isCancelled = currentEvent.type === "cancelled";

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 max-w-md w-full transition-all duration-300
      ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}
      ${className}
    `}>
      <div className={`
        bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg p-4
        ${isSuccess ? "border-emerald-500/50" : ""}
        ${isCancelled ? "border-red-500/50" : ""}
      `}>
        <div className="flex items-start gap-3">
          <div className={`
            p-2 rounded-full
            ${isSuccess ? "bg-emerald-500 text-black" : "bg-red-500 text-white"}
          `}>
            {isSuccess ? (
              <X className="w-5 h-5" />
            ) : isCancelled ? (
              <X className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            {isSuccess ? (
              <p className="text-sm font-medium text-white">Booking Confirmed</p>
            ) : isCancelled ? (
              <p className="text-sm font-medium text-white">Booking Cancelled</p>
            ) : (
              <p className="text-sm font-medium text-white">Booking Update</p>
            )}
            <p className="text-xs text-zinc-400">
              {currentEvent.email || "Someone"}{" "}
              {isSuccess ? "booked" : isCancelled ? "cancelled" : "updated"} a{" "}
              {currentEvent.type === "created" ? "call" : "consultation"}
            </p>
          </div>
          <button
            onClick={() => {
              setVisible(false);
              setCurrentEvent(null);
            }}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
