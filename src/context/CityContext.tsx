import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Тип контекста
interface CityContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const CityContext = createContext<CityContextType>({
  city: "",
  setCity: () => {},
});

export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const savedCity = localStorage.getItem("city") || "";
  const [city, setCity] = useState<string>(savedCity);

  useEffect(() => {
    if (city) {
      localStorage.setItem("city", city);
    }
  }, [city]);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCityProvider = () => {
  return useContext(CityContext);
};
