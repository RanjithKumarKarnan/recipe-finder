import { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (value) => {
    setInput(value);
  };

  async function apiCall() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${input}&diet=vegan&number=10&addRecipeInformation=false&apiKey=1d07780aebf449469dbdb615f29a8865`,
    );

    const output = await response.json();

    setData(output.results);
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center m-[2rem]">
        <h1 className="text-[1.5rem] font-[600] mb-[1rem]">Recipe Finder</h1>

        <div className="flex gap-[1rem]">
          <input
            type="text"
            onChange={(e) => handleInput(e.target.value)}
            className="border h-[2rem] rounded-lg w-[300px] outline-none p-[0.3rem_0.5rem]"
          />

          <button
            className="border p-[0rem_2rem] rounded-lg bg-[#2a9d8f] cursor-pointer"
            onClick={apiCall}
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {data.map((item) => {
            return (
              <div key={item.id} className="border p-4 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[200px] rounded-lg"
                />
                <p className="mt-2 font-semibold">{item.title}</p>
                <p>Ready In: {item.readyInMinutes} mins</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
