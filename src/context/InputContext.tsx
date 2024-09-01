import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { City, type LocationData } from "../lib/types";

export type InputContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  recentSearches: LocationData[];
  handleSearch: (searchTerm: string | City, lat: number, lon: number) => void;
  selectedLocation: LocationData | null;
  setSelectedLocation: Dispatch<SetStateAction<LocationData | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const InputContext = createContext<InputContextType | undefined>(
  undefined,
);

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );
  const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error(
          "Error getting recent searches from localStorage:",
          error,
        );
      }
    }
  }, []);

  const handleSearch = (
    searchTerm: string | City,
    lat: number,
    lon: number,
  ) => {
    const searchName =
      typeof searchTerm === "string" ? searchTerm : searchTerm.name;

    const existingSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    const updatedSearches = [
      { name: searchName, lat, lon },
      ...existingSearches.filter(
        (term: LocationData) => term.name !== searchName,
      ),
    ];
    if (updatedSearches.length > 5) {
      updatedSearches.pop();
    }

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    setSearch(searchName);
  };

  return (
    <InputContext.Provider
      value={{
        isOpen,
        setIsOpen,
        search,
        setSearch,
        selectedLocation,
        setSelectedLocation,
        recentSearches,
        handleSearch,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
