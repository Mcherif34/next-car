import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const {manufacturer, model, year, limit, fuel} = filters;
    const headers = {
		'X-RapidAPI-Key': '6f87a51cdbmshbc5a5c3579e13f6p1d0833jsn4528fa1e171f',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	};

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`;

    const response = await fetch(url, { headers });

    const result = await response.json();

    return result;
}

export const updateSearchParams = (type:string, value:string) => {
      const searchParams = new URLSearchParams(window.location.search);

        searchParams.set(type, value);

    
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname
}

export const calculateCarRent = (city_mpg: number, year:number) => {
    const basePricePerDay = 350; //base rental price per day in dirhams
    const mileageFactor = 0.1; // additional rate per mile driven
    const ageFactor = 0.05; //additional rate per year of vehicule age

    //Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    //Calculate total rental per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?:string) => {

    const url = new URL('https://cdn.imagin.studio/getimage');

    const {make, year, model} = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const  convertMPGtoKPH = (mpg: number) => {
  const milesToKilometers = 1.60934;
  const gallonsToLiters = 3.78541;
  
  // Conversion de miles par gallon en kilomètres par litre
  const kmpl = mpg * milesToKilometers / gallonsToLiters;
  
  // Conversion de kilomètres par litre en kilomètres par heure
  const kph = kmpl * 60;
  
  return kph;
}