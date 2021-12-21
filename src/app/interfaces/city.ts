export interface City {
  zipcode: number;
  name: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  weather: {
    main: string;
    icon: string;
  };

}
