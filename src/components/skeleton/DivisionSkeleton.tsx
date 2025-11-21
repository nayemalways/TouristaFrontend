
const DivisionSkeleton = ({ i }: {i: number}) => {
    return (
        <>
           <li key={i} className="border-b-2">
          <div className="flex items-center bg-muted shadow rounded-lg p-3 max-h-[120px] animate-pulse">
            {/* Image */}
            <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md bg-gray-200" />

            {/* Title & Description */}
            <div className="flex-1 px-4 space-y-2">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto" /> {/* title */}
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" /> {/* description line 1 */}
              <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto" /> {/* description line 2 */}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-center">
              <div className="w-12 h-8 bg-gray-300 rounded" /> {/* edit button */}
              <div className="w-12 h-8 bg-gray-300 rounded" /> {/* delete button */}
            </div>
          </div>
        </li>
        </>
    );
};

export default DivisionSkeleton;