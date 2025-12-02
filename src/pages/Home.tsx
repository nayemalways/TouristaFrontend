/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import { formatShortDate } from "@/utils/dateFormatter";
import { Link } from "react-router";

const Home = () => {
  const { data } = useGetToursQuery(undefined);

  return (
    <div className="w-full min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 dark:text-gray-100 text-center">
          Welcome to Tourista
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data &&
            data?.map((tour: any, i: number) => (
              <Link key={i} to={`/tour/${tour?._id}`}>
                <div
                  className="
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-xl shadow-md overflow-hidden transition 
      hover:shadow-xl hover:scale-[0.97] cursor-pointer
      duration-300 ease-out
    "
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <img
                      src={tour?.images[0]}
                      alt={tour?.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* GRADIENT OVERLAY */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-1/2 
        bg-linear-to-t from-black/70 via-black/40 to-transparent pointer-events-none"
                    />

                    {/* DATE INSIDE GRADIENT */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm font-semibold">
                        {formatShortDate(tour?.startDate)} —{" "}
                        {formatShortDate(tour?.endDate)}
                      </p>
                    </div>

                    {/* PRICE BADGE */}
                    <div
                      className="absolute top-2 right-2 bg-primary text-white px-3 py-1 
        rounded-full text-sm font-semibold shadow"
                    >
                      ৳ {tour?.costFrom}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {tour?.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {tour?.division?.name}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                      {tour?.description}
                    </p>
                  </div>

                  <Button
                    className="
      w-full py-2 cursor-pointer bg-orange-500 text-white font-semibold 
      hover:bg-amber-500 dark:hover:bg-amber-600 transition
    "
                  >
                    Book Now
                  </Button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
