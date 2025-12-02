/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTourByIdQuery } from "@/redux/features/tour/tour.api";
import { useNavigate, useParams } from "react-router";
import ImageSlider from "@/components/modules/tours/ImageSlider";
import CounterButton from "@/components/modules/tours/CounterButton";
import { Button } from "@/components/ui/button";
import { useBookTourMutation } from "@/redux/features/payment/payment.api";
import { useState } from "react";
import { toast } from "sonner";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import TourDetailsSkeleton from "@/components/skeleton/TourDetailsSkeleton";

const formatTourDate = (start: string, end: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  const s = new Date(start).toLocaleDateString("en-US", options);
  const e = new Date(end).toLocaleDateString("en-US", options);
  return `${s} - ${e}`;
};

const TourDetails = () => {
  const [guest, setGuest] = useState(1);
  const { tourId } = useParams();
  const { data } = useGetTourByIdQuery(tourId);
  const navigate = useNavigate();
  const tour = data;

  const [bookTour, { isLoading }] = useBookTourMutation();
  const { data: userData, isLoading: userDataLoading } =
    useGetMeQuery(undefined);

  const handleCheckout = async () => {
    if (!userData && !userDataLoading) {
      navigate("/login");
      return;
    }

    try {
      const res = await bookTour({
        guestCount: guest,
        tour: tourId,
      }).unwrap();

      if (res.success) {
        navigate("/tour/checkout", {
          state: res.data,
        });
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  if (!tour) return <TourDetailsSkeleton/>

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        {/* Main Layout */}
        <div className="flex flex-wrap -mx-4">
          {/* ------- IMAGE GALLERY ------- */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ImageSlider images={tour?.images} />
          </div>

          {/* ------- TOUR DETAILS ------- */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>

            <p className="text-muted-foreground mb-3">
              <strong>Division:</strong> {tour.division.name}
            </p>
            <p className="text-muted-foreground mb-3">
              <strong>Min Age:</strong> {tour.minAge}
            </p>
            <p className="text-muted-foreground mb-3">
              <strong>Max Guest Allowed:</strong> {tour.maxGuest || 2}
            </p>

            <p className="text-muted-foreground mb-4">
              <strong>Duration:</strong>{" "}
              {formatTourDate(tour.startDate, tour.endDate)}
            </p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                ৳ {tour.costFrom}
              </span>
              <span className="text-gray-400 ml-2">/ per person</span>
            </div>

            <p className="text-gray-700 mb-6 dark:text-gray-300">{tour.description}</p>
            <p className="text-gray-700 mb-6 dark:text-gray-300">
              Add Guest:{" "}
              <CounterButton
                defaultValue={guest}
                onChange={(value) => setGuest(value)}
                max={tour.maxGuest}
              />
            </p>

            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                onClick={handleCheckout}
                className="bg-orange-600 cursor-pointer text-white px-6 py-3 rounded-md hover:bg-orange-700"
              >
                Book Now
              </Button>
            )}

            {/* Separator */}
            <hr className="my-8" />

            {/* ------- INCLUDED / EXCLUDED ------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Included</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {tour.included.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Excluded</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {tour.excluded.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Amenities</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {tour.amenities.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ------- TOUR PLAN ------- */}
        <div className="p-6 rounded-lg shadow mt-10">
          <h3 className="text-2xl font-semibold mb-4">Tour Plan</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {tour.tourPlan.map((plan: string, i: number) => (
              <li key={i} className="p-3 rounded border">
                {plan}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
