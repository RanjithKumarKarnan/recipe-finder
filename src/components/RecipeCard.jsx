const RecipeCard = ({ item }) => {
  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="bg-[#e9c46a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl duration-300"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[220px] object-cover"
      />
      
      <div className="p-4">
        <h2 className="font-semibold text-[1rem] line-clamp-2">{item.title}</h2>

        <p className="text-[#264653] mt-2 text-sm">
          ⏱ {item.readyInMinutes} mins
        </p>
      </div>
    </a>
  );
};

export default RecipeCard;
