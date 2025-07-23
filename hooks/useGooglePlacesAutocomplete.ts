import { useEffect, useRef, useState, useCallback } from 'react';

// Google Maps type definitions
interface GoogleMapsGeometry {
  location?: {
    lat: () => number;
    lng: () => number;
  };
  viewport?: any;
}

interface GooglePlace {
  place_id?: string;
  formatted_address?: string;
  name?: string;
  geometry?: GoogleMapsGeometry;
}

interface GoogleAutocomplete {
  addListener: (event: string, callback: () => void) => void;
  getPlace: () => GooglePlace;
}

interface GooglePlacesService {
  Autocomplete: new (
    input: HTMLInputElement,
    options?: GooglePlacesOptions
  ) => GoogleAutocomplete;
}

interface GoogleMaps {
  places: GooglePlacesService;
  event: {
    clearInstanceListeners: (instance: GoogleAutocomplete) => void;
  };
}

interface GooglePlacesOptions {
  types?: string[];
  componentRestrictions?: {
    country: string;
  };
  fields?: string[];
}

interface PlaceResult {
  place_id?: string;
  formatted_address?: string;
  name?: string;
  geometry?: GoogleMapsGeometry;
}

interface UseGooglePlacesAutocompleteProps {
  apiKey?: string;
  options?: GooglePlacesOptions;
  onPlaceSelect?: (place: PlaceResult) => void;
}

interface UseGooglePlacesAutocompleteReturn {
  inputRef: React.RefObject<HTMLInputElement>;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}



export const useGooglePlacesAutocomplete = ({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  options = {
    types: ["establishment", "geocode"],
    componentRestrictions: {
      country: "in",
    },
    fields: ["place_id", "formatted_address", "name", "geometry"],
  },
  onPlaceSelect,
}: UseGooglePlacesAutocompleteProps = {}): UseGooglePlacesAutocompleteReturn => {
  const inputRef = useRef<HTMLInputElement|any>(null);
  const [autocomplete, setAutocomplete] = useState<GoogleAutocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeAutocomplete = useCallback(() => {
    if (window.google && inputRef.current) {
      try {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );

        autocompleteInstance.addListener("place_changed", () => {
          const place = autocompleteInstance.getPlace();
          if (place && onPlaceSelect) {
            onPlaceSelect({
              place_id: place.place_id,
              formatted_address: place.formatted_address,
              name: place.name,
              geometry: place.geometry,
            });
          }
        });

        setAutocomplete(autocompleteInstance);
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        setError('Failed to initialize Google Places Autocomplete');
        console.error('Google Places Autocomplete initialization error:', err);
      }
    }
  }, []); // Remove dependencies to prevent infinite loops

  const loadGoogleMapsScript = useCallback(() => {
    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    if (window._googleMapsLoaded || window.google) {
      initializeAutocomplete();
      return;
    }

    setIsLoading(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window._googleMapsLoaded = true;
      setIsLoading(false);
      initializeAutocomplete();
    };

    script.onerror = () => {
      setIsLoading(false);
      setError('Failed to load Google Maps API');
    };

    document.head.appendChild(script);
  }, [apiKey]); // Remove initializeAutocomplete dependency

  useEffect(() => {
    // Use the latest options and onPlaceSelect when initializing
    const currentInitialize = () => {
      if (window.google && inputRef.current) {
        try {
          const autocompleteInstance = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
          );

          autocompleteInstance.addListener("place_changed", () => {
            const place = autocompleteInstance.getPlace();
            if (place && onPlaceSelect) {
              onPlaceSelect({
                place_id: place.place_id,
                formatted_address: place.formatted_address,
                name: place.name,
                geometry: place.geometry,
              });
            }
          });

          setAutocomplete(autocompleteInstance);
          setIsLoaded(true);
          setError(null);
        } catch (err) {
          setError('Failed to initialize Google Places Autocomplete');
          console.error('Google Places Autocomplete initialization error:', err);
        }
      }
    };

    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    if (window._googleMapsLoaded || window.google) {
      currentInitialize();
      return;
    }

    setIsLoading(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window._googleMapsLoaded = true;
      setIsLoading(false);
      currentInitialize();
    };

    script.onerror = () => {
      setIsLoading(false);
      setError('Failed to load Google Maps API');
    };

    // Only add script if it doesn't exist
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      if (autocomplete && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
        setAutocomplete(null);
      }
    };
  }, []); // Empty dependency array to run only once

  return {
    inputRef,
    isLoaded,
    isLoading,
    error,
  };
};