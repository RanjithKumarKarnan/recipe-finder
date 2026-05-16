const RecipeSkeleton = () => {
  return (
    <div className="animate-pulse bg-[#e9c46a] rounded-2xl overflow-hidden shadow-md">
      <div className="bg-[#f4a261] h-[220px] w-full"></div>

      <div className="p-4">
        <div className="bg-[#2a9d8f] h-4 rounded w-[80%] mb-3"></div>

        <div className="bg-[#e76f51] h-4 rounded w-[40%]"></div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
