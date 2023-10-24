import axios from "axios";
import apiBaseURL from "./../utils/apiBaseURL";


export const useApi = axios.create({
    baseURL: apiBaseURL,
});

export default useApi;
