// // components/modules/tours/TourCardSkeleton.tsx
// const TourSkeletonList = ({ count = 8 }: { count?: number }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {Array.from({ length: count }).map((_, i) => (
//         <div
//           key={i}
//           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
//     rounded-xl shadow-md overflow-hidden animate-pulse w-[300px] "
//         >
//           {/* IMAGE */}
//           <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

//           {/* TEXT */}
//           <div className="p-4 space-y-2">
//             <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
//             <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2"></div>
//             <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-full"></div>
//           </div>

//           {/* BUTTON */}
//           <div className="w-full h-10 bg-gray-300 dark:bg-gray-700"></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TourSkeletonList;

const TourCardSkeleton = () => {
  const skeletons = Array.from({ length: 8 }); // 8 skeleton cards

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="
            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
            rounded-xl shadow-md overflow-hidden animate-pulse
          "
        >
          {/* IMAGE SKELETON */}
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 relative">
            <div className="absolute top-2 right-2 w-16 h-6 bg-gray-400 dark:bg-gray-600 rounded-full" />
            <div className="absolute bottom-3 left-3 w-24 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
          </div>

          {/* CONTENT SKELETON */}
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-3/4" />
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2" />
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-full" />
          </div>

          {/* BUTTON SKELETON */}
          <div className="px-4 pb-4">
            <div className="h-10 bg-orange-400 dark:bg-orange-600 rounded w-full" />
          </div>
        </div>
      ))}
    </>
  );
};


export default TourCardSkeleton;