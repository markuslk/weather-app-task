import LocationIcon from "./icons/LocationIcon";
import LocationIconFilled from "./icons/LocationIconFilled";
import { getLatLon } from "../api/getLatLon";
import { useNavigate } from "react-router-dom";
import { useInputContext } from "../hooks/useInputContext";
import { type City } from "../lib/types";
import { cities } from "../lib/cities";
import { useEffect, useState } from "react";

const LocationInput = () => {
  const {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    setSelectedLocation,
    handleSearch,
  } = useInputContext();
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [autocompleteOption, setAutoCompleteOption] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length >= 2) {
      const filteredSuggestions = cities
        .filter((city) =>
          city.name.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
      setIsOpen(true);
      setAutoCompleteOption(0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [search, setIsOpen]);

  const handleSelect = async (city: City | string) => {
    if (!city) return;

    try {
      const searchedTerm = typeof city === "string" ? city : city.name;
      const data = await getLatLon(searchedTerm);
      setSearch(data.name);
      setSelectedLocation(data);
      setIsOpen(false);
      handleSearch(searchedTerm, data.lat, data.lon);
      navigate(`/weather?lat=${data.lat}&lon=${data.lon}`);
    } catch (error) {
      console.log(error);
      setIsOpen(false);
      setError({ message: "Error getting data" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setAutoCompleteOption((prev) =>
        Math.min(prev + 1, suggestions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      setAutoCompleteOption((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (suggestions.length > 0) {
        handleSelect(suggestions[autocompleteOption]);
      }
    }
  };

  return (
    <form
      className="relative flex w-full max-w-[501px] flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (search.length >= 2 && suggestions.length > 0) {
          handleSelect(suggestions[autocompleteOption]);
        }
      }}
    >
      <div className="flex h-18.5 w-full items-center gap-2 rounded-lg bg-dark-gray py-2.5 pl-4 pr-2">
        <LocationIconFilled
          className={`shrink-0 transition-opacity ease-in ${search ? "relative opacity-100" : "absolute opacity-0"}`}
        />
        <LocationIcon
          className={`shrink-0 transition-opacity ease-in ${search ? "absolute opacity-0" : "relative opacity-100"}`}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-lg/4.5 text-secondary-white outline-none placeholder:text-primary"
          placeholder="Enter location"
        />
        <div
          onClick={() => {
            setSearch("");
            if (isOpen) {
              setIsOpen((prev) => !prev);
            }
          }}
          className={`cursor-pointer self-start px-3 py-2.5 text-xs/4.5 text-faded-gray opacity-0 transition ${search ? "opacity-100" : "cursor-default"}`}
        >
          Clear
        </div>
      </div>
      <div
        className={`relative z-20 w-full rounded-lg bg-dark-gray px-4 transition duration-500 ease-in-out ${isOpen && suggestions.length > 0 ? "h-auto translate-y-0 py-5 opacity-100" : "h-0 -translate-y-5 opacity-0"}`}
      >
        <ul className={`flex flex-col gap-4 ${!isOpen && "hidden"}`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.name}
              onClick={() => handleSelect(suggestion)}
              className={`group cursor-pointer rounded px-3 py-3.5 hover:bg-primary-gray ${index === autocompleteOption ? "bg-primary-gray" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="leading-4.5 text-secondary-white">
                  {suggestion.name}
                </h3>
                <p
                  className={`text-xs/4.5 text-faded-gray ${index === autocompleteOption ? "block" : "hidden"}`}
                >
                  Press Enter to select
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {error && <div className="self-center">{error.message}</div>}
    </form>
  );
};
export default LocationInput;
