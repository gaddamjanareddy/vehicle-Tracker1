import axios from 'axios';

const BASE_URL = "https://vehicle-tracker-backend-qgfu.onrender.com/api";

export const getCurrentLocation = () => axios.get(`${BASE_URL}/location`);
export const getRouteData = () => axios.get(`${BASE_URL}/route`);
