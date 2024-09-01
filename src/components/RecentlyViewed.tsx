import { useNavigate } from "react-router-dom";
import { useInputContext } from "../hooks/useInputContext";
import ArrowIcon from "./icons/ArrowIcon";

const RecentlyViewed = () => {
  const {
    setSearch,
    setSelectedLocation,
    setIsOpen,
    handleSearch,
    recentSearches,
  } = useInputContext();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-[900px] self-start py-4 xl:py-18">
      <h6 className="pb-2 text-xs/4.5">Recently Viewed</h6>
      <div className="flex flex-wrap gap-2.5 xl:gap-4">
        {recentSearches.map((recentSearch) => (
          <div key={recentSearch.name} className="group w-full max-w-[442px]">
            <div className="flex w-full items-center justify-between gap-4 rounded-[10px] bg-dark-gray px-7.5 py-5 font-medium transition group-hover:bg-secondary-gray/60">
              <h4 className="break-words break-all text-2xl/4.5">
                {recentSearch.name}
              </h4>
              <button
                onClick={() => {
                  setSearch(recentSearch.name);
                  setSelectedLocation(recentSearch);
                  setIsOpen(false);
                  handleSearch(
                    recentSearch.name,
                    recentSearch.lat,
                    recentSearch.lon,
                  );
                  navigate(
                    `/weather?lat=${recentSearch.lat}&lon=${recentSearch.lon}`,
                  );
                }}
                className="flex cursor-pointer items-center justify-end gap-2.5"
              >
                <h5 className="leading-4.5 underline-offset-4 hover:underline">
                  Check Weather
                </h5>
                <ArrowIcon className="shrink-0 rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentlyViewed;
