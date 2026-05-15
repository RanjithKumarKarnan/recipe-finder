import { useEffect, useState } from "react";
import axios from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import RecipeCard from "../components/RecipeCard";
import RecipeSkeleton from "../components/RecipeSkeleton";
import EmptyState from "../components/EmptyState";
import FilterButtons from "../components/FilterButtons";

const Home = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("vegan");
  const debouncedSearch = useDebounce(input, 1500);

  useEffect(() => {
    if (debouncedSearch.trim().length < 3) {
      setRecipes([]);
      return;
    }

    fetchRecipes();
  }, [debouncedSearch, activeFilter]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("/recipes/complexSearch", {
        params: {
          query: debouncedSearch,
          diet: activeFilter,
          number: 6,
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });

      setRecipes(response.data.results);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 402) {
        setError(
          "Daily free-tier API limit exceeded. Please use Spoonacular Pro version or try again tomorrow.",
        );
      } else {
        setError("Failed to fetch recipes");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <h1 className="text-center text-4xl font-bold text-[#264653]">
          Recipe Finder
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Discover recipes with ingredients you already have
        </p>

        {/* Search Bar */}

        <div className="flex justify-center mt-10">
          <input
            type="text"
            value={input}
            placeholder="chicken, rice, broccoli"
            onChange={(e) => setInput(e.target.value)}
            className="
              w-full
              md:w-[650px]
              h-[60px]
              bg-white
              rounded-2xl
              px-6
              shadow-md
              outline-none
              text-[1rem]
            "
          />
        </div>

        {/* Filters */}

        <div className="flex justify-center mt-6">
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Error Message */}

        {error && (
          <div
            className="
              max-w-2xl
              mx-auto
              mt-10
              bg-[#fff3cd]
              border
              border-[#ffe69c]
              text-[#664d03]
              px-6
              py-4
              rounded-2xl
              shadow-sm
            "
          >
            <h2 className="font-semibold text-[1.1rem]">API Limit Reached</h2>

            <p className="mt-2 leading-[1.7]">
              Daily free-tier API limit exceeded. Please use Spoonacular Pro
              version or try again tomorrow.
            </p>
          </div>
        )}

        {/* Empty State */}

        {!loading && recipes.length === 0 && input.trim().length < 3 && (
          <EmptyState />
        )}

        {/* Recipe Grid */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            mt-14
          "
        >
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <RecipeSkeleton key={index} />)
            : recipes.map((item) => <RecipeCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
