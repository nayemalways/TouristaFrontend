export default function TourDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="flex flex-wrap -mx-4">
        
        {/* LEFT IMAGE SECTION */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-16 bg-gray-300 dark:bg-gray-700 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="w-full md:w-1/2 px-4">
          <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

          <div className="space-y-3 mb-4">
            <div className="w-1/2 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-1/2 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="w-40 h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

          <div className="w-full h-20 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

          {/* Guest Counter Skeleton */}
          <div className="w-48 h-10 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

          {/* Button Skeleton */}
          <div className="w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8" />

          <hr className="my-8 border-gray-300 dark:border-gray-700" />

          {/* Included & Excluded Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="mt-8">
            <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TOUR PLAN SKELETON */}
      <div className="p-6 rounded-lg shadow mt-10">
        <div className="h-7 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-300 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
