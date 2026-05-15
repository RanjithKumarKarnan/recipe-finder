const RecipeSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="bg-gray-300 h-[220px] w-full"></div>

      <div className="p-4">
        <div className="bg-gray-300 h-4 rounded w-[80%] mb-3"></div>

        <div className="bg-gray-300 h-4 rounded w-[40%]"></div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
