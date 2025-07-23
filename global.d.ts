declare global {
  interface Window {
    L: any;
  }
}

// ---------------------
// ✅ Global Declarations
// ---------------------
declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
    _googleMapsLoaded: boolean;
  }
}

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: {
              types?: string[];
              componentRestrictions?: {
                country: string;
              };
              fields?: string[];
            }
          ) => {
            addListener: (event: string, callback: () => void) => void;
            getPlace: () => {
              place_id?: string;
              formatted_address?: string;
              name?: string;
              geometry?: {
                location?: {
                  lat: () => number;
                  lng: () => number;
                };
                viewport?: any;
              };
            };
          };
        };
        event: {
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
    _googleMapsLoaded: boolean;
  }
}

export {};