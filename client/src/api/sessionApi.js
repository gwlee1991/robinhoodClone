import axios from 'axios';

export const signUp = async (user) => {
	const response = await axios.post('/api/v1/signup', user);
	const userInfo = response.data;
	return userInfo;
}

export const logIn = async (user) => {
	const response = await axios.post('/api/v1/login', user);
	const userInfo = response.data;
	return userInfo;
}

export const getCurrentUser = async () => {
	const response = await axios.get('/api/v1/currentuser');
	return response.data;
}

export const demoLogIn = async () => {
	const response = await axios.post('/api/v1/login/demo', {});
	const userInfo = response.data;
	return userInfo;
}