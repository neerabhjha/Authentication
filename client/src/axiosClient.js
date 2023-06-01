import axios from "axios";
import {getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localStorageManager";

export const axiosClient = axios.create({
    baseURL:"http://localhost:4000",
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response) => {
        // console.log(response);
        const data = response.data;
        if(data.status === 'ok'){
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;

        if(statusCode === 401 && originalRequest.url === "http://localhost:4000/auth/refresh"){
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/", '_self');
            return Promise.reject(error);
        }

        if(statusCode === 401){
            const response = await axiosClient.get('/auth/refresh');
            // console.log(response);
            if(response.status === 'ok'){
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;
                // console.log(response.result.accessToken);
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
)