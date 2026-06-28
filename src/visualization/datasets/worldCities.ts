import type { Dataset } from '@/visualization/types'

/**
 * Demo dataset: major world cities with approximate population (millions).
 * Replace this dataset to swap in any geographic data.
 */
export const WORLD_CITIES_DATASET: Dataset = {
  id: 'world-cities',
  name: 'World Cities',
  points: [
    { id: 'tokyo',      name: 'Tokyo',          lat:  35.68,  lng: 139.69,  value: 37.4,  category: 'asia' },
    { id: 'delhi',      name: 'Delhi',          lat:  28.66,  lng:  77.23,  value: 32.9,  category: 'asia' },
    { id: 'shanghai',   name: 'Shanghai',       lat:  31.23,  lng: 121.47,  value: 28.5,  category: 'asia' },
    { id: 'dhaka',      name: 'Dhaka',          lat:  23.72,  lng:  90.41,  value: 22.0,  category: 'asia' },
    { id: 'saopaulo',   name: 'São Paulo',      lat: -23.55,  lng: -46.63,  value: 22.4,  category: 'americas' },
    { id: 'cairo',      name: 'Cairo',          lat:  30.05,  lng:  31.25,  value: 21.3,  category: 'africa' },
    { id: 'mexico',     name: 'Mexico City',    lat:  19.43,  lng: -99.13,  value: 21.7,  category: 'americas' },
    { id: 'beijing',    name: 'Beijing',        lat:  39.90,  lng: 116.41,  value: 20.9,  category: 'asia' },
    { id: 'mumbai',     name: 'Mumbai',         lat:  19.08,  lng:  72.88,  value: 20.7,  category: 'asia' },
    { id: 'osaka',      name: 'Osaka',          lat:  34.69,  lng: 135.50,  value: 19.1,  category: 'asia' },
    { id: 'karachi',    name: 'Karachi',        lat:  24.86,  lng:  67.01,  value: 16.1,  category: 'asia' },
    { id: 'chongqing',  name: 'Chongqing',      lat:  29.56,  lng: 106.55,  value: 16.9,  category: 'asia' },
    { id: 'istanbul',   name: 'Istanbul',       lat:  41.01,  lng:  28.95,  value: 15.5,  category: 'europe' },
    { id: 'kinshasa',   name: 'Kinshasa',       lat:  -4.32,  lng:  15.32,  value: 15.6,  category: 'africa' },
    { id: 'lagos',      name: 'Lagos',          lat:   6.52,  lng:   3.38,  value: 15.3,  category: 'africa' },
    { id: 'buenosaires',name: 'Buenos Aires',   lat: -34.60,  lng: -58.38,  value: 15.3,  category: 'americas' },
    { id: 'rio',        name: 'Rio de Janeiro', lat: -22.91,  lng: -43.17,  value: 13.7,  category: 'americas' },
    { id: 'moscow',     name: 'Moscow',         lat:  55.75,  lng:  37.62,  value: 12.5,  category: 'europe' },
    { id: 'london',     name: 'London',         lat:  51.51,  lng:  -0.13,  value: 11.1,  category: 'europe' },
    { id: 'paris',      name: 'Paris',          lat:  48.86,  lng:   2.35,  value:  11.0, category: 'europe' },
    { id: 'newyork',    name: 'New York',       lat:  40.71,  lng: -74.01,  value: 18.8,  category: 'americas' },
    { id: 'losangeles', name: 'Los Angeles',    lat:  34.05,  lng:-118.24,  value: 12.4,  category: 'americas' },
    { id: 'sydney',     name: 'Sydney',         lat: -33.87,  lng: 151.21,  value:  5.3,  category: 'oceania' },
    { id: 'nairobi',    name: 'Nairobi',        lat:  -1.29,  lng:  36.82,  value:  5.1,  category: 'africa' },
    { id: 'toronto',    name: 'Toronto',        lat:  43.65,  lng: -79.38,  value:  6.4,  category: 'americas' },
  ],
}
