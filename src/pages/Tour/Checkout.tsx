import { Button } from "@/components/ui/button"; // If you're using shadcn/ui
import { formatShortDate } from "@/utils/dateFormatter";
import { useState } from "react";
import { useLocation } from "react-router";


export default function Checkout() {
  const location = useLocation();
  const [state] = useState(location.state);
  const { paymentURL, booking } = state;
  const { user, tour, payment, guestCount, status } = booking;

  const handlePayment = () => {
    window.location.href = paymentURL; // Redirect to SSLCommerz
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-lg rounded-xl border">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Checkout – Complete Your Booking
      </h2>

      {/* Booking Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Details */}
        <div className="border rounded-lg p-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Traveler Information
          </h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>

        {/* Tour Details */}
        <div className="border rounded-lg p-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Tour Details
          </h3>
          <p>
            <strong>Tour:</strong> {tour.title}
          </p>
          <p>
            <strong>Travel Dates: </strong>
            {formatShortDate(tour.startDate)}-{formatShortDate(tour.endDate)}
          </p>
          <p>
            <strong>Guests:</strong> {guestCount}
          </p>
          <p>
            <strong>Status:</strong>
            <span className="ml-1 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-sm">
              {status}
            </span>
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-8 p-5 border rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Payment Summary
        </h3>
        <div className="flex justify-between text-lg">
          <span>Total Amount (BDT)</span>
          <strong>{payment.amount.toLocaleString()} BDT</strong>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          *This includes the total cost for {guestCount} guests.
        </p>
      </div>

      {/* Pay Button */}
      <div className="mt-8 text-right">
        <Button
          onClick={handlePayment}
          className="px-6 py-3 text-lg bg-primary hover:bg-primary text-white cursor-pointer rounded-lg"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
