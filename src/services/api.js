import axios from 'axios';

const BASE_URL = "http://localhost:5000/api";

export const getCurrentLocation = () => axios.get(`${BASE_URL}/location`);
export const getRouteData = () => axios.get(`${BASE_URL}/route`);
