const filters = ["vegan", "gluten free", "vegetarian"];

const FilterButtons = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex gap-3 flex-wrap mt-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full border capitalize duration-300
          
          ${activeFilter === filter ? "bg-[#264653] text-white" : "bg-[#e9c46a] text-[#264653]"}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
