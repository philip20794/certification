export interface Weather {
  temp: {
    max: number;
    min: number;
  };
  weather: {
    main: string;
    icon: string;
  };
  date: Date;
}

export interface Forecast {
  zipcode: number;
  name: string;
  days: Array<Weather>;
}
