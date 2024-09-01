import { useState, useCallback } from "react";
import { type Coordinates } from "../lib/types";

export const useCurrentLocation = () => {
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentUserLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          console.log("Error getting current location", error);
          setError("Cannot access location data. Please refresh to try again");
          setLoading(false);
        },
      );
    } else {
      console.log("Geolocation is not supported");
      setError("Geolocation is not supported");
    }
  }, []);

  return { currentUserLocation, error, loading, requestUserLocation };
};
