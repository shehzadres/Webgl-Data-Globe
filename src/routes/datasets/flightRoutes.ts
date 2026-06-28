import type { RouteDataset } from '@/routes/routeTypes'

/**
 * Demo dataset: major intercontinental flight routes.
 * Source/destination coords match the world cities dataset.
 */
export const FLIGHT_ROUTES_DATASET: RouteDataset = {
  id: 'flight-routes',
  name: 'Major Flight Routes',
  routes: [
    // ── Trans-Pacific ─────────────────────────────────────────────────────────
    {
      id: 'r-tok-lax',  sourceName: 'Tokyo',         sourceId: 'tokyo',
      destinationName: 'Los Angeles', destinationId: 'losangeles',
      source: { lat: 35.68, lng: 139.69 }, destination: { lat: 34.05, lng: -118.24 },
      category: 'pacific', weight: 0.9,
    },
    {
      id: 'r-sha-lax',  sourceName: 'Shanghai',      sourceId: 'shanghai',
      destinationName: 'Los Angeles', destinationId: 'losangeles',
      source: { lat: 31.23, lng: 121.47 }, destination: { lat: 34.05, lng: -118.24 },
      category: 'pacific', weight: 0.8,
    },
    {
      id: 'r-tok-nyc',  sourceName: 'Tokyo',         sourceId: 'tokyo',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 35.68, lng: 139.69 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'pacific', weight: 0.85,
    },
    {
      id: 'r-bei-nyc',  sourceName: 'Beijing',       sourceId: 'beijing',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 39.90, lng: 116.41 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'pacific', weight: 0.7,
    },
    // ── Trans-Atlantic ───────────────────────────────────────────────────────
    {
      id: 'r-lon-nyc',  sourceName: 'London',        sourceId: 'london',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 51.51, lng: -0.13 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'intercontinental', weight: 1.0,
    },
    {
      id: 'r-par-nyc',  sourceName: 'Paris',         sourceId: 'paris',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 48.86, lng: 2.35 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'intercontinental', weight: 0.9,
    },
    {
      id: 'r-lon-tor',  sourceName: 'London',        sourceId: 'london',
      destinationName: 'Toronto',     destinationId: 'toronto',
      source: { lat: 51.51, lng: -0.13 }, destination: { lat: 43.65, lng: -79.38 },
      category: 'intercontinental', weight: 0.7,
    },
    {
      id: 'r-mos-nyc',  sourceName: 'Moscow',        sourceId: 'moscow',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 55.75, lng: 37.62 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'intercontinental', weight: 0.65,
    },
    // ── Europe ↔ Asia ────────────────────────────────────────────────────────
    {
      id: 'r-lon-tok',  sourceName: 'London',        sourceId: 'london',
      destinationName: 'Tokyo',       destinationId: 'tokyo',
      source: { lat: 51.51, lng: -0.13 }, destination: { lat: 35.68, lng: 139.69 },
      category: 'intercontinental', weight: 0.8,
    },
    {
      id: 'r-par-sha',  sourceName: 'Paris',         sourceId: 'paris',
      destinationName: 'Shanghai',    destinationId: 'shanghai',
      source: { lat: 48.86, lng: 2.35 }, destination: { lat: 31.23, lng: 121.47 },
      category: 'intercontinental', weight: 0.75,
    },
    {
      id: 'r-mos-bei',  sourceName: 'Moscow',        sourceId: 'moscow',
      destinationName: 'Beijing',     destinationId: 'beijing',
      source: { lat: 55.75, lng: 37.62 }, destination: { lat: 39.90, lng: 116.41 },
      category: 'intercontinental', weight: 0.7,
    },
    {
      id: 'r-ist-sha',  sourceName: 'Istanbul',      sourceId: 'istanbul',
      destinationName: 'Shanghai',    destinationId: 'shanghai',
      source: { lat: 41.01, lng: 28.95 }, destination: { lat: 31.23, lng: 121.47 },
      category: 'intercontinental', weight: 0.6,
    },
    // ── Asia internal ────────────────────────────────────────────────────────
    {
      id: 'r-tok-sha',  sourceName: 'Tokyo',         sourceId: 'tokyo',
      destinationName: 'Shanghai',    destinationId: 'shanghai',
      source: { lat: 35.68, lng: 139.69 }, destination: { lat: 31.23, lng: 121.47 },
      category: 'asia', weight: 0.85,
    },
    {
      id: 'r-tok-bei',  sourceName: 'Tokyo',         sourceId: 'tokyo',
      destinationName: 'Beijing',     destinationId: 'beijing',
      source: { lat: 35.68, lng: 139.69 }, destination: { lat: 39.90, lng: 116.41 },
      category: 'asia', weight: 0.8,
    },
    {
      id: 'r-sha-del',  sourceName: 'Shanghai',      sourceId: 'shanghai',
      destinationName: 'Delhi',       destinationId: 'delhi',
      source: { lat: 31.23, lng: 121.47 }, destination: { lat: 28.66, lng: 77.23 },
      category: 'asia', weight: 0.7,
    },
    {
      id: 'r-del-mum',  sourceName: 'Delhi',         sourceId: 'delhi',
      destinationName: 'Mumbai',      destinationId: 'mumbai',
      source: { lat: 28.66, lng: 77.23 }, destination: { lat: 19.08, lng: 72.88 },
      category: 'asia', weight: 0.75,
    },
    {
      id: 'r-kar-del',  sourceName: 'Karachi',       sourceId: 'karachi',
      destinationName: 'Delhi',       destinationId: 'delhi',
      source: { lat: 24.86, lng: 67.01 }, destination: { lat: 28.66, lng: 77.23 },
      category: 'asia', weight: 0.55,
    },
    // ── Americas ─────────────────────────────────────────────────────────────
    {
      id: 'r-nyc-sao',  sourceName: 'New York',      sourceId: 'newyork',
      destinationName: 'São Paulo',   destinationId: 'saopaulo',
      source: { lat: 40.71, lng: -74.01 }, destination: { lat: -23.55, lng: -46.63 },
      category: 'americas', weight: 0.85,
    },
    {
      id: 'r-nyc-mex',  sourceName: 'New York',      sourceId: 'newyork',
      destinationName: 'Mexico City', destinationId: 'mexico',
      source: { lat: 40.71, lng: -74.01 }, destination: { lat: 19.43, lng: -99.13 },
      category: 'americas', weight: 0.8,
    },
    {
      id: 'r-lax-mex',  sourceName: 'Los Angeles',   sourceId: 'losangeles',
      destinationName: 'Mexico City', destinationId: 'mexico',
      source: { lat: 34.05, lng: -118.24 }, destination: { lat: 19.43, lng: -99.13 },
      category: 'americas', weight: 0.75,
    },
    {
      id: 'r-sao-bue',  sourceName: 'São Paulo',     sourceId: 'saopaulo',
      destinationName: 'Buenos Aires',destinationId: 'buenosaires',
      source: { lat: -23.55, lng: -46.63 }, destination: { lat: -34.60, lng: -58.38 },
      category: 'americas', weight: 0.7,
    },
    {
      id: 'r-sao-rio',  sourceName: 'São Paulo',     sourceId: 'saopaulo',
      destinationName: 'Rio de Janeiro', destinationId: 'rio',
      source: { lat: -23.55, lng: -46.63 }, destination: { lat: -22.91, lng: -43.17 },
      category: 'americas', weight: 0.8,
    },
    {
      id: 'r-tor-nyc',  sourceName: 'Toronto',       sourceId: 'toronto',
      destinationName: 'New York',    destinationId: 'newyork',
      source: { lat: 43.65, lng: -79.38 }, destination: { lat: 40.71, lng: -74.01 },
      category: 'americas', weight: 0.65,
    },
    // ── Africa ───────────────────────────────────────────────────────────────
    {
      id: 'r-cai-lon',  sourceName: 'Cairo',         sourceId: 'cairo',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: 30.05, lng: 31.25 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'africa', weight: 0.65,
    },
    {
      id: 'r-lag-lon',  sourceName: 'Lagos',         sourceId: 'lagos',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: 6.52, lng: 3.38 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'africa', weight: 0.6,
    },
    {
      id: 'r-nai-lon',  sourceName: 'Nairobi',       sourceId: 'nairobi',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: -1.29, lng: 36.82 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'africa', weight: 0.55,
    },
    {
      id: 'r-cai-dub',  sourceName: 'Cairo',         sourceId: 'cairo',
      destinationName: 'Dubai (via Mumbai)', destinationId: 'mumbai',
      source: { lat: 30.05, lng: 31.25 }, destination: { lat: 19.08, lng: 72.88 },
      category: 'africa', weight: 0.6,
    },
    // ── Oceania ──────────────────────────────────────────────────────────────
    {
      id: 'r-syd-lax',  sourceName: 'Sydney',        sourceId: 'sydney',
      destinationName: 'Los Angeles', destinationId: 'losangeles',
      source: { lat: -33.87, lng: 151.21 }, destination: { lat: 34.05, lng: -118.24 },
      category: 'pacific', weight: 0.75,
    },
    {
      id: 'r-syd-tok',  sourceName: 'Sydney',        sourceId: 'sydney',
      destinationName: 'Tokyo',       destinationId: 'tokyo',
      source: { lat: -33.87, lng: 151.21 }, destination: { lat: 35.68, lng: 139.69 },
      category: 'pacific', weight: 0.7,
    },
    {
      id: 'r-syd-lon',  sourceName: 'Sydney',        sourceId: 'sydney',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: -33.87, lng: 151.21 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'pacific', weight: 0.65,
    },
    // ── Europe internal ──────────────────────────────────────────────────────
    {
      id: 'r-lon-par',  sourceName: 'London',        sourceId: 'london',
      destinationName: 'Paris',       destinationId: 'paris',
      source: { lat: 51.51, lng: -0.13 }, destination: { lat: 48.86, lng: 2.35 },
      category: 'europe', weight: 0.9,
    },
    {
      id: 'r-par-mos',  sourceName: 'Paris',         sourceId: 'paris',
      destinationName: 'Moscow',      destinationId: 'moscow',
      source: { lat: 48.86, lng: 2.35 }, destination: { lat: 55.75, lng: 37.62 },
      category: 'europe', weight: 0.7,
    },
    {
      id: 'r-ist-lon',  sourceName: 'Istanbul',      sourceId: 'istanbul',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: 41.01, lng: 28.95 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'europe', weight: 0.7,
    },
    // ── Long-haul cross-hemisphere ───────────────────────────────────────────
    {
      id: 'r-nyc-lon',  sourceName: 'New York',      sourceId: 'newyork',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: 40.71, lng: -74.01 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'intercontinental', weight: 1.0,
    },
    {
      id: 'r-sha-lon',  sourceName: 'Shanghai',      sourceId: 'shanghai',
      destinationName: 'London',      destinationId: 'london',
      source: { lat: 31.23, lng: 121.47 }, destination: { lat: 51.51, lng: -0.13 },
      category: 'intercontinental', weight: 0.75,
    },
  ],
}
