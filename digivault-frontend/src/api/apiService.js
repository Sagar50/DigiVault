import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchHello = async () => {
    const response = await axios.get(`${API_URL}/hello`);
    return response.data;
};

export const getAssets = async () => {
    const response = await axios.get(`${API_URL}/balance/0xd3340a03566d976Cb7970308ea31b0111610C1A1`);
    return response.data;
};