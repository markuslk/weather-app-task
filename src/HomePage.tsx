import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from "./components/LocationInput";
import Logo from "./components/Logo";
import RecentlyViewed from "./components/RecentlyViewed";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { useInputContext } from "./hooks/useInputContext";
import { getCity } from "./api/getCity";

const HomePage = () => {
  const { currentUserLocation, loading, error, requestUserLocation } =
    useCurrentLocation();
  const { setSearch, recentSearches } = useInputContext();
  const navigate = useNavigate();

  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  useEffect(() => {
    if (!currentUserLocation) return;
    const handleUserLocationRequest = async () => {
      try {
        const { latitude, longitude } = currentUserLocation;
        const data = await getCity(latitude, longitude);
        navigate(`/weather?lat=${latitude}&lon=${longitude}`);
        setSearch(data.name);
      } catch (error) {
        console.log(error);
        throw new Error("Error getting weather data for location");
      }
    };

    handleUserLocationRequest();
  }, [currentUserLocation, navigate, setSearch]);

  return (
    <>
      <header className="bg-secondary-gray">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <Logo />
        </div>
      </header>
      <div className="mx-auto flex max-w-[1047px] flex-col items-center px-6">
        <div className="flex w-full -translate-y-7.5 flex-col items-center gap-6">
          <LocationInput />
          <button
            onClick={requestUserLocation}
            className="group text-xs/4.5 transition hover:text-secondary-white"
          >
            {!loading && !error ? (
              <span className="group-hover:border-secondary-white border-b">
                Select my current location
              </span>
            ) : loading && !error ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              `${error}`
            )}
          </button>
        </div>
        {recentSearches.length > 0 && <RecentlyViewed />}
      </div>
    </>
  );
};
export default HomePage;
