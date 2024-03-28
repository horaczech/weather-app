import { AxiosResponse } from "axios";

export type Location = {
  category: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
  elevation: number;
  timeZone: string;
  urlPath: string;
  country: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
  subregion: {
    id: string;
    name: string;
  };
  isInOcean: boolean;
  _links: {
    self?: {
      href: string;
    };
    celestialevents?: {
      href: string;
    };
    forecast?: {
      href: string;
    };
    cameras?: {
      href: string;
    };
    now?: {
      href: string;
    };
    subseasonalforecast?: {
      href: string;
    };
    mapfeature?: {
      href: string;
    };
    notifications?: {
      href: string;
    };
    extremeforecasts?: {
      href: string;
    };
    warnings?: {
      href: string;
    };
    extremewarnings?: {
      href: string;
    };
    currenthour?: {
      href: string;
    };
    observations?: {
      href: string;
    }[];

    watertemperatures?: {
      href: string;
    };
    airqualityforecast?: {
      href: string;
    };
    pollen?: {
      href: string;
    };
    auroraforecast?: {
      href: string;
    };
  };
};

export type LocationSearch = {
  totalResults: number;
  _links: {
    self?: {
      href: string;
    };
    page: {
      href: string;
      templated?: true;
    };
    search: {
      href: string;
      templated?: true;
    };
    location: {
      href: string;
    }[];
  };
  _embedded: {
    location: Location[];
  };
};

export type LocationSearchRes = AxiosResponse<LocationSearch>["data"];

export type LocationDetail = {
  category: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
  elevation: number;
  timeZone: string;
  urlPath: string;
  country: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
  subregion: {
    id: string;
    name: string;
  };
  isInOcean: false;
  _links: {
    self: {
      href: string;
    };
    celestialevents: {
      href: string;
    };
    forecast: {
      href: string;
    };
    cameras: {
      href: string;
    };
    mapfeature: {
      href: string;
    };
    currenthour: {
      href: string;
    };
    observations: [
      {
        href: string;
      },
      {
        href: string;
      },
    ];
  };
};

export type LocationDetailRes = AxiosResponse<LocationDetail>["data"];

export type CurrentHour = {
  created: string;
  symbolCode: {
    next1Hour: string;
  };
  temperature: {
    value: number;
    feelsLike: number;
  };
  precipitation: {
    value: number;
  };
  wind: {
    direction: number;
    speed: number;
  };
  status: {
    code: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
};

export type CurrentHourRes = AxiosResponse<CurrentHour>["data"];

export type Forecast = {
  created: string;
  update: string;
  uv: {
    duration: {
      days: number;
      hours: number;
    };
    url: string;
    displayUrl: string;
  };
  dayIntervals: {
    start: string;
    end: string;
    twentyFourHourSymbol: string;
    twelveHourSymbols: (string | null)[];
    sixHourSymbols: (string | null)[];
    precipitation: {
      value: number;
    };
    temperature: {
      value: number;
      min: number;
      max: number;
    };
    wind: {
      min: number;
      max: number;
    };
  }[];
  _links: {
    self: {
      href: string;
    };
  };
};
