import { useCityProvider } from "../../context/CityContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE_PATHS } from "../../routes/route-path";

export const SearchPage = () => {
  const { city, setCity } = useCityProvider();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (city) {
      navigate(APP_ROUTE_PATHS.DASHBOARD);
    } else {
      console.log("Please enter a city.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Weather Search
        </h1>
        <input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          type="text"
          placeholder="Enter city name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search Weather
        </button>
      </div>
    </div>
  );
};
