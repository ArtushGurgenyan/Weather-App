import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCityProvider } from "../../context/CityContext";
import { useNavigate } from "react-router-dom";

const fetchData = async (city: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return res.data;
};

export const Dashboard = () => {
  const { city, setCity } = useCityProvider();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchData(city),
    enabled: !!city,
  });

  const handleSubmitBack = () => {
    if (city) {
      localStorage.removeItem("city");
      navigate("/search");
      setCity("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Weather Dashboard
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <span className="text-xl text-gray-600">Loading...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center">
          <span className="text-xl text-red-600">Error: {error.message}</span>
        </div>
      )}

      {data && !isLoading && !error && (
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            {data.name}
          </h2>

          <div className="flex justify-between text-lg">
            <span>Temperature:</span>
            <span>{data.main.temp}°C</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Weather:</span>
            <span>{data.weather[0].description}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Humidity:</span>
            <span>{data.main.humidity}%</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Wind Speed:</span>
            <span>{data.wind.speed} m/s</span>
          </div>
          <button
            onClick={handleSubmitBack}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700 transition duration-300 ease-in-out ml-auto block"
          >
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
};
