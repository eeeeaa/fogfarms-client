import axios from 'axios';

const baseURL = 'https://salty-oasis-24147.herokuapp.com';
const axiosApp = axios.create({
	baseURL,
	withCredentials: true,
});
export default axiosApp;
