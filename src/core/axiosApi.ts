import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

const configAxios = {
    baseURL: 'https://status.neuralgeneration.com/api'
} as CreateAxiosDefaults;

export const axiosApi: AxiosInstance = axios.create(configAxios)
